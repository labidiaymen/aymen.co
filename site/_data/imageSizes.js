// Real pixel dimensions for everything in public/images, keyed by the URL a
// template would use. og:image:width/height were hard-coded to 1200x630, which
// silently lied for every cover that was not exactly that size — and some
// platforms lay the preview out from those numbers before the image loads.
// Note cards are generated after Eleventy runs, so they are not in here; they
// are 1200x630 by construction and the template falls back to that.
const { readdirSync, existsSync } = require("node:fs");
const { join, extname } = require("node:path");
const sharp = require("sharp");

const DIR = "public/images";
const EXTS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp", ".avif"]);

module.exports = async function () {
  if (!existsSync(DIR)) return {};

  const files = readdirSync(DIR).filter((f) => EXTS.has(extname(f).toLowerCase()));
  const sizes = {};

  await Promise.all(
    files.map(async (file) => {
      try {
        // Reads the header only, so 100+ images cost little.
        const { width, height } = await sharp(join(DIR, file)).metadata();
        if (width && height) sizes[`/images/${file}`] = { width, height };
      } catch {
        // A file sharp cannot read just falls back to the default numbers.
      }
    })
  );

  return sizes;
};
