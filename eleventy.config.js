const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const CATEGORY_LABELS = {
  ai: "AI",
  javascript: "JavaScript",
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

  eleventyConfig.addPassthroughCopy({ public: "/" });
  eleventyConfig.addPassthroughCopy({ "site/css": "css" });

  // All posts, newest first. Each post gets an archive number: 001 is the
  // oldest post, so the newest carries the highest number.
  eleventyConfig.addCollection("posts", (api) => {
    const posts = api
      .getFilteredByGlob("site/posts/*.md")
      .sort((a, b) => a.date - b.date);
    posts.forEach((post, i) => {
      post.data.num = String(i + 1).padStart(3, "0");
    });
    return posts.reverse();
  });

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

  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

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
      .replace(/\s+/g, " ")
      .trim();
    return text.length > 180 ? text.slice(0, 177).trimEnd() + "…" : text;
  });

  eleventyConfig.addFilter("absoluteUrl", (path, base) =>
    new URL(path, base).toString()
  );

  eleventyConfig.addFilter("rssDate", (date) => new Date(date).toUTCString());

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
