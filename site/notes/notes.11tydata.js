const { plain, truncate, stripFrontMatter } = require("../../lib/markdown-text.cjs");

module.exports = {
  layout: "layouts/note.njk",
  tags: ["note"],
  eleventyComputed: {
    ogCard: (data) => `/og/${data.page.fileSlug}.png`,
    // A note has no hand-written summary, so the share card and the social
    // description both open with the note itself rather than the site blurb.
    description: (data) =>
      truncate(plain(stripFrontMatter(data.page.rawInput || "")), 160) || undefined,
  },
};
