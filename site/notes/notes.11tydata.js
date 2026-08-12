module.exports = {
  layout: "layouts/note.njk",
  tags: ["note"],
  eleventyComputed: {
    ogCard: (data) => `/og/${data.page.fileSlug}.png`,
  },
};
