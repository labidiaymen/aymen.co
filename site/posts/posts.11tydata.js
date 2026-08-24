// Eleventy strips a leading YYYY-MM-DD- from fileSlug and filePathStem, so the
// filename is only reliable through inputPath. The generator names cards by the
// same filename, and the two must agree.
const fileName = (data) => data.page.inputPath.split("/").pop().replace(/\.md$/, "");

module.exports = {
  layout: "layouts/post.njk",
  eleventyComputed: {
    // Points at the card the build generates, but only for a post that has no
    // image of its own — `og`, `cover` and `thumb` all win over it in base.njk.
    ogCard: (data) =>
      data.og || data.cover || data.thumb ? undefined : `/og/${fileName(data)}.png`,
  },
};
