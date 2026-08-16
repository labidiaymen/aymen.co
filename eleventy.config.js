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
        // An LCP candidate marks itself up front; the rest stay lazy.
        ...(attrs.fetchpriority ? { fetchpriority: attrs.fetchpriority } : {}),
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

  // Map of series name -> its posts, oldest first. A series reads forwards:
  // part one was written first, so date order is part order unless a post says
  // otherwise with seriesOrder.
  eleventyConfig.addCollection("series", (api) => {
    const groups = new Map();
    for (const post of api.getFilteredByGlob("site/posts/*.md")) {
      const name = post.data.series;
      if (!name) continue;
      if (!groups.has(name)) groups.set(name, []);
      groups.get(name).push(post);
    }
    for (const posts of groups.values()) {
      posts.sort((a, b) => {
        const byOrder = (a.data.seriesOrder ?? Infinity) - (b.data.seriesOrder ?? Infinity);
        return byOrder || a.date - b.date;
      });
    }
    return groups;
  });

  // Book notes, newest first. A note joins the reading page by naming the book
  // it is about; nothing else marks it.
  eleventyConfig.addCollection("books", (api) =>
    api
      .getFilteredByGlob("site/notes/*.md")
      .filter((note) => note.data.book)
      .sort((a, b) => b.date - a.date)
  );

  // Short notes, newest first
  eleventyConfig.addCollection("notes", (api) =>
    api.getFilteredByGlob("site/notes/*.md").sort((a, b) => b.date - a.date)
  );

  // Everything published, newest first — what the feed carries. Notes are the
  // most frequent thing here, so a posts-only feed would show subscribers least
  // of what actually gets written.
  eleventyConfig.addCollection("published", (api) =>
    api
      .getFilteredByGlob(["site/posts/*.md", "site/notes/*.md"])
      .sort((a, b) => b.date - a.date)
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

  // "Oct 28" — the year sits under it in the notes rail, so it is left off here.
  eleventyConfig.addFilter("dayStamp", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      timeZone: "UTC",
    })
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

  // A long note is shown as a teaser: whole blocks up to a limit, then a link.
  // Most notes are short enough to appear in full.
  const NOTE_LIMIT = 900;

  const plainText = (html) =>
    String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();

  const VOID_TAGS = new Set(["br", "hr", "img", "input", "source", "col", "wbr"]);

  // Whole top-level blocks in document order. Depth tracking keeps a nested
  // list from ending its parent early, and taking blocks in order means a
  // teaser never silently skips over one.
  const topLevelBlocks = (html) => {
    const blocks = [];
    const tag = /<(\/?)([a-z][a-z0-9]*)\b[^>]*?(\/?)>/gi;
    let depth = 0;
    let start = null;
    let match;
    while ((match = tag.exec(html))) {
      const [full, closing, name, selfClosing] = match;
      const isVoid = Boolean(selfClosing) || VOID_TAGS.has(name.toLowerCase());
      if (closing) {
        if (depth > 0) depth -= 1;
        if (depth === 0 && start !== null) {
          blocks.push(html.slice(start, match.index + full.length));
          start = null;
        }
      } else if (!isVoid) {
        if (depth === 0) start = match.index;
        depth += 1;
      }
    }
    return blocks;
  };

  eleventyConfig.addFilter("isLongNote", (html, limit = NOTE_LIMIT) => plainText(html).length > limit);

  eleventyConfig.addFilter("noteTeaser", (html, limit = NOTE_LIMIT) => {
    const source = String(html || "");
    if (plainText(source).length <= limit) return source;
    const blocks = topLevelBlocks(source);
    let out = "";
    for (const block of blocks) {
      out += block;
      if (plainText(out).length >= limit) break;
    }
    return out || blocks[0] || source;
  });

  // Every series as a list, the one with the newest part first — so the block on
  // the writing page leads with whatever is being written now.
  eleventyConfig.addFilter("seriesList", (seriesMap) =>
    [...(seriesMap || new Map()).entries()]
      .map(([name, parts]) => ({
        name,
        total: parts.length,
        first: parts[0],
        latest: parts[parts.length - 1],
      }))
      .sort((a, b) => b.latest.date - a.latest.date)
  );

  // Everything the template needs in one object: a Map is awkward to read from
  // Nunjucks, and `set` inside a loop would not escape the loop's scope.
  eleventyConfig.addFilter("seriesInfo", (seriesMap, name, url) => {
    const parts = (seriesMap && seriesMap.get(name)) || [];
    const index = parts.findIndex((p) => p.url === url);
    return {
      parts,
      total: parts.length,
      number: index + 1,
      next: index >= 0 ? parts[index + 1] : undefined,
    };
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
