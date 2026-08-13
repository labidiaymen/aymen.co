const { plain, truncate, stripFrontMatter } = require("../../lib/markdown-text.cjs");

// A note may have no title at all — a status is its own text. Untitled notes are
// filed by date (2026-08-13.md -> /notes/2026-08-13/), so they need no slug.
const body = (data) => plain(stripFrontMatter(data.page.rawInput || ""));

// Eleventy reads a leading YYYY-MM-DD- as a date prefix and strips it from both
// fileSlug and filePathStem, so a second note on one day (2026-08-13-2.md) would
// shrink to "2" and point at a card that does not exist. inputPath is the only
// one that keeps the filename the card generator actually wrote.
const fileName = (data) => data.page.inputPath.split("/").pop().replace(/\.md$/, "");

module.exports = {
  layout: "layouts/note.njk",
  tags: ["note"],
  eleventyComputed: {
    ogCard: (data) => `/og/${fileName(data)}.png`,
    // A note has no hand-written summary, so the share card and the social
    // description both open with the note itself rather than the site blurb.
    description: (data) => truncate(body(data), 160) || undefined,
    // Browser tab, og:title and feed entry. A titleless note still needs a name
    // in the places that cannot show a whole paragraph.
    seoTitle: (data) => data.title || truncate(body(data), 70) || undefined,
  },
};
