// Writes a note file so posting one costs a command, not a ritual.
//
//   npm run note -- "Shipped Lumen 0.4 today."
//   npm run note -- --title "On small teams" "The whole argument in one line."
//   npm run note                                  (opens an empty note to edit)
//
// A titled note is filed under its title (/notes/on-small-teams/). An untitled one
// has no words to name it, so it is filed by date (/notes/2026-08-13/). Either way
// a name already taken gets -2, -3, and so on.
import { writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const NOTES_DIR = "site/notes";

const argv = process.argv.slice(2);
let title = null;
const words = [];
for (let i = 0; i < argv.length; i += 1) {
  if (argv[i] === "--title" || argv[i] === "-t") {
    title = argv[i + 1] ?? null;
    i += 1;
  } else {
    words.push(argv[i]);
  }
}
const text = words.join(" ").trim();

const now = new Date();
const stamp = [
  now.getFullYear(),
  String(now.getMonth() + 1).padStart(2, "0"),
  String(now.getDate()).padStart(2, "0"),
].join("-");

mkdirSync(NOTES_DIR, { recursive: true });

// A title makes a readable URL; a date is the fallback when there is no title.
// Never leave a leading YYYY-MM-DD- on a titled slug — Eleventy reads that as a
// date prefix and strips it from fileSlug and filePathStem.
const slugify = (value) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/^\d{4}-\d{2}-\d{2}-/, "")
    .slice(0, 70)
    .replace(/-+$/, "");

const base = (title && slugify(title)) || stamp;

// Name already taken: on-small-teams-2.md, 2026-08-13-2.md
let slug = base;
for (let n = 2; existsSync(join(NOTES_DIR, `${slug}.md`)); n += 1) slug = `${base}-${n}`;

const file = join(NOTES_DIR, `${slug}.md`);
const front = ["---", `date: ${stamp}`];
if (title) front.push(`title: ${JSON.stringify(title)}`);
front.push("---", "");

writeFileSync(file, `${front.join("\n")}\n${text}\n`, "utf8");

console.log(`✓ ${file}`);
console.log(`  ${text ? "" : "write the note, then "}npm run build`);
console.log(`  https://aymen.co/notes/${slug}/`);
