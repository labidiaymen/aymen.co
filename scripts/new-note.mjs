// Writes a note file so posting one costs a command, not a ritual.
//
//   npm run note -- "Shipped Lumen 0.4 today."
//   npm run note -- --title "On small teams" "The whole argument in one line."
//   npm run note                                  (opens an empty note to edit)
//
// Untitled notes are filed by date, so the URL is /notes/2026-08-13/. A second
// note on the same day gets -2, -3, and so on.
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

// Same day, second note: 2026-08-13-2.md
let slug = stamp;
for (let n = 2; existsSync(join(NOTES_DIR, `${slug}.md`)); n += 1) slug = `${stamp}-${n}`;

const file = join(NOTES_DIR, `${slug}.md`);
const front = ["---", `date: ${stamp}`];
if (title) front.push(`title: ${JSON.stringify(title)}`);
front.push("---", "");

writeFileSync(file, `${front.join("\n")}\n${text}\n`, "utf8");

console.log(`✓ ${file}`);
console.log(`  ${text ? "" : "write the note, then "}npm run build`);
console.log(`  https://aymen.co/notes/${slug}/`);
