module.exports = {
  layout: "layouts/post.njk",
  eleventyComputed: {
    // Share card rendered by scripts/og-images.mjs for posts without a cover.
    ogCard: (data) => `/og/${data.page.fileSlug}.png`,
  },
};
