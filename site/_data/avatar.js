// Resolves the header/profile photo, if one has been added.
// Drop a square image at public/images/avatar.{jpg,png,webp} and it is used
// automatically; with no file present the header falls back to the wordmark.
const fs = require("fs");
const path = require("path");

const IMAGE_DIR = path.join(__dirname, "..", "..", "public", "images");
const CANDIDATES = ["avatar.jpg", "avatar.jpeg", "avatar.png", "avatar.webp"];

module.exports = function () {
  for (const file of CANDIDATES) {
    if (fs.existsSync(path.join(IMAGE_DIR, file))) return `/images/${file}`;
  }
  return null;
};
