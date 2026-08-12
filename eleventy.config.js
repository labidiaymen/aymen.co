const path = require("path");
const fs = require("fs");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const eleventyImage = require("@11ty/eleventy-img");
const generateImage = eleventyImage.default; // v7 exports the queue function as default
const { generateHTML } = eleventyImage;

const IMAGE_SOURCE_DIR = path.join(__dirname, "public", "images");
// Animated GIFs lose their frames through sharp, and SVGs are already small.
const SKIP_EXTENSIONS = new Set([".gif", ".svg", ".ico"]);

function parseAttributes(tag) {
  const attrs = {};
  for (const m of tag.matchAll(/([\w-]+)(?:=("([^"]*)"|'([^']*)'))?/g)) {
    if (m.index === 0) continue; // the tag name itself
    attrs[m[1]] = m[3] ?? m[4] ?? "";
  }
  return attrs;
}

// Turns <img src="/images/x.jpg"> into a responsive <picture>; leaves remote
// images, unknown files and animated formats untouched.
async function optimizeImages(content) {
  if (!(this.page?.outputPath || "").endsWith(".html")) return content;
  if (!content.includes("<img")) return content;

  const replacements = [];
  for (const match of content.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const attrs = parseAttributes(tag);
    const src = attrs.src || "";
    if (!src.startsWith("/images/")) continue;

    const file = path.join(IMAGE_SOURCE_DIR, decodeURIComponent(src.slice("/images/".length)));
    if (SKIP_EXTENSIONS.has(path.extname(file).toLowerCase()) || !fs.existsSync(file)) continue;

    // A sized thumbnail (the avatar) only ever needs its own width.
    const declaredWidth = Number(attrs.width) || null;
    const small = declaredWidth && declaredWidth <= 320;

    // A single unreadable file must never fail the whole build: fall back to
    // the original tag and carry on.
    try {
      const metadata = await generateImage(file, {
        // Text column is 44rem, so 1440 covers a 2x retina display; anything
        // larger would ship pixels no layout can use.
        widths: small ? [declaredWidth, declaredWidth * 2] : [480, 960, 1440],
        formats: ["avif", "webp", "auto"],
        outputDir: path.join(__dirname, "_site", "img"),
        urlPath: "/img/",
      });

      const html = generateHTML(metadata, {
        alt: attrs.alt || "",
        class: attrs.class,
        loading: attrs.loading || "lazy",
        decoding: attrs.decoding || "async",
        sizes: small ? `${declaredWidth}px` : "(max-width: 44rem) 100vw, 44rem",
      });
      replacements.push([tag, html]);
    } catch (error) {
      console.warn(`[images] skipped ${src}: ${error.message}`);
    }
  }

  let out = content;
  for (const [tag, html] of replacements) out = out.replace(tag, html);
  return out;
}

function slugifyHeading(text) {
  return text
    .toLowerCase()
    .replace(/&[a-z]+;/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

const CATEGORY_LABELS = {
  ai: "AI",
  javascript: "JavaScript",
  lumen: "Lumen",
  angular: "Angular",
  rxjs: "RxJS",
  ionic: "Ionic",
  nativescript: "NativeScript",
  "c-plus-plus": "C++",
  "node-js": "Node.js",
  jstips: "JS Tips",
  devops: "DevOps",
  projects: "Projects",
  events: "Events",
  thoughts: "Thoughts",
  log: "Log",
  labs: "Labs",
  general: "General",
  inscription: "Trainings",
  react: "React",
  redux: "Redux",
  vue: "Vue",
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  // Every local <img> in the built HTML becomes a <picture> with AVIF and WebP
  // sources at several widths. Sources are read straight from public/images so
  // resolution never depends on passthrough-copy ordering.
  eleventyConfig.addTransform("optimizeImages", optimizeImages);

  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ "site/css": "css" });

  // All posts, newest first
  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("site/posts/*.md")
      .sort((a, b) => b.date - a.date)
  );

  // Short notes, newest first
  eleventyConfig.addCollection("notes", (api) =>
    api.getFilteredByGlob("site/notes/*.md").sort((a, b) => b.date - a.date)
  );

  // Map of category -> posts (newest first), used to paginate category pages
  eleventyConfig.addCollection("categoryMap", (api) => {
    const map = {};
    for (const post of api.getFilteredByGlob("site/posts/*.md")) {
      for (const cat of post.data.categories || []) {
        (map[cat] = map[cat] || []).push(post);
      }
    }
    return Object.entries(map)
      .map(([slug, posts]) => ({
        slug,
        label: CATEGORY_LABELS[slug] || slug,
        posts: posts.sort((a, b) => b.date - a.date),
      }))
      .sort((a, b) => b.posts.length - a.posts.length);
  });

  // Category pages, except "projects" which has a curated page of its own
  eleventyConfig.addCollection("categoryPages", (api) => {
    const map = {};
    for (const post of api.getFilteredByGlob("site/posts/*.md")) {
      for (const cat of post.data.categories || []) {
        (map[cat] = map[cat] || []).push(post);
      }
    }
    delete map.projects;
    return Object.entries(map).map(([slug, posts]) => ({
      slug,
      label: CATEGORY_LABELS[slug] || slug,
      posts: posts.sort((a, b) => b.date - a.date),
    }));
  });

  eleventyConfig.addFilter("categoryLabel", (slug) => CATEGORY_LABELS[slug] || slug);

  eleventyConfig.addFilter("categoryPosts", (categoryMap, slug) => {
    const group = (categoryMap || []).find((g) => g.slug === slug);
    return group ? group.posts : [];
  });

  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    })
  );

  eleventyConfig.addFilter("isoDate", (date) => new Date(date).toISOString());

  eleventyConfig.addFilter("year", (date) =>
    new Date(date).getUTCFullYear()
  );

  eleventyConfig.addFilter("readingTime", (content) => {
    const words = String(content || "")
      .replace(/<[^>]+>/g, " ")
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  });

  // Headings for the in-article table of contents. Also gives each heading an
  // id so the links have somewhere to land.
  eleventyConfig.addFilter("headings", (content) => {
    const out = [];
    for (const m of String(content || "").matchAll(/<h([23])[^>]*>([\s\S]*?)<\/h\1>/g)) {
      const text = m[2].replace(/<[^>]+>/g, "").trim();
      if (!text) continue;
      out.push({ level: Number(m[1]), text, id: slugifyHeading(text) });
    }
    return out;
  });

  // Adds ids to h2/h3 in rendered post bodies so the contents can link to them.
  eleventyConfig.addTransform("headingIds", function (content) {
    if (!(this.page?.outputPath || "").endsWith(".html")) return content;
    return content.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (all, level, inner) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      return text ? `<h${level} id="${slugifyHeading(text)}">${inner}</h${level}>` : all;
    });
  });

  // Notes on the home page show a teaser: whole paragraphs up to a limit,
  // then a link. Short notes are shown in full.
  const plainText = (html) =>
    String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  eleventyConfig.addFilter("isLongNote", (html, limit = 260) => plainText(html).length > limit);

  eleventyConfig.addFilter("noteTeaser", (html, limit = 260) => {
    const source = String(html || "");
    if (plainText(source).length <= limit) return source;
    const paragraphs = source.match(/<p>[\s\S]*?<\/p>/g) || [];
    let out = "";
    for (const paragraph of paragraphs) {
      out += paragraph;
      if (plainText(out).length >= limit) break;
    }
    return out || paragraphs[0] || source;
  });

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  eleventyConfig.addFilter("skipFirst", (arr) => (arr || []).slice(1));

  eleventyConfig.addFilter("groupByYear", (posts) => {
    const groups = [];
    for (const post of posts || []) {
      const year = new Date(post.date).getUTCFullYear();
      const last = groups[groups.length - 1];
      if (last && last.year === year) last.posts.push(post);
      else groups.push({ year, posts: [post] });
    }
    return groups;
  });

  eleventyConfig.addFilter("excerpt", (content) => {
    const text = String(content || "")
      .replace(/<[^>]+>/g, " ")
      .replace(/&quot;/g, '"')
      .replace(/&#39;|&apos;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ")
      .replace(/\[[^\]]*\]/g, " ")
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 180 ? text.slice(0, 177).trimEnd() + "…" : text;
  });

  eleventyConfig.addFilter("absoluteUrl", (path, base) =>
    new URL(path, base).toString()
  );

  eleventyConfig.addFilter("rssDate", (date) => new Date(date).toUTCString());

  // Older/newer neighbours of a post within the newest-first posts collection
  eleventyConfig.addFilter("adjacent", (posts, url) => {
    const i = (posts || []).findIndex((p) => p.url === url);
    if (i === -1) return { older: null, newer: null };
    return { older: posts[i + 1] || null, newer: posts[i - 1] || null };
  });

  // Up to n other posts sharing the primary category
  eleventyConfig.addFilter("related", (posts, url, categories, n = 3) => {
    const primary = (categories || [])[0];
    if (!primary) return [];
    return (posts || [])
      .filter((p) => p.url !== url && (p.data.categories || []).includes(primary))
      .slice(0, n);
  });

  // Markdown-syntax images load lazily (raw HTML in old posts is untouched)
  eleventyConfig.amendLibrary("md", (md) => {
    const orig = md.renderer.rules.image;
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
      tokens[idx].attrSet("loading", "lazy");
      tokens[idx].attrSet("decoding", "async");
      return orig(tokens, idx, options, env, self);
    };
  });

  // Content hash on the stylesheet URL: cache it for a year, update instantly.
  const cssHash = require("crypto")
    .createHash("sha256")
    .update(fs.readFileSync(path.join(__dirname, "site", "css", "main.css")))
    .digest("hex")
    .slice(0, 8);
  eleventyConfig.addGlobalData("cssHash", cssHash);

  eleventyConfig.addShortcode("year", () => String(new Date().getFullYear()));

  eleventyConfig.setLiquidOptions({ dynamicPartials: true });

  return {
    dir: {
      input: "site",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    // Markdown is NOT preprocessed as Nunjucks: several posts contain Angular
    // template syntax ({{ }}) in code samples that must be rendered verbatim.
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
};
