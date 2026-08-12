// Fails the build if any page references a local asset that was not written,
// or if a page silently disappeared. A corrupt image once truncated a build
// and dropped pages from the site without any error surfacing.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const SITE = "_site";
const MIN_PAGES = 50;

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const files = walk(SITE);
const pages = files.filter((f) => f.endsWith(".html"));
const problems = [];

if (pages.length < MIN_PAGES) {
  problems.push(`only ${pages.length} pages built, expected at least ${MIN_PAGES}`);
}

const referenced = new Set();
for (const page of pages) {
  const html = readFileSync(page, "utf8");
  for (const m of html.matchAll(/(?:src|href|srcset)="([^"]+)"/g)) {
    for (const candidate of m[1].split(",")) {
      const url = candidate.trim().split(" ")[0];
      if (!url.startsWith("/") || url.startsWith("//")) continue;
      referenced.add(decodeURIComponent(url.split("#")[0].split("?")[0]));
    }
  }
}

for (const url of referenced) {
  const path = join(SITE, url);
  const asHtml = url.endsWith("/") ? join(path, "index.html") : path;
  if (existsSync(asHtml)) continue;
  // Extensionless internal links resolve to a directory index.
  if (!extname(url) && existsSync(join(path, "index.html"))) continue;
  problems.push(`missing: ${url}`);
}

const feed = join(SITE, "feed.xml");
if (existsSync(feed) && !readFileSync(feed, "utf8").includes("<item>")) {
  problems.push("feed.xml has no items");
}

if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):`);
  for (const p of problems.slice(0, 40)) console.error("   " + p);
  process.exit(1);
}

console.log(`✓ ${pages.length} pages, ${referenced.size} local references, all resolve`);
