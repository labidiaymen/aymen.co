// Renders a share card per note, so a note pasted into LinkedIn or X shows its
// own text. Posts use their own cover image instead.
// Runs after Eleventy; the templates point at /og/<slug>.png.
import { readFileSync, readdirSync, mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";
import satori from "satori";
import sharp from "sharp";

const OUT_DIR = "_site/og";
const WIDTH = 1200;
const HEIGHT = 630;

const PAPER = "#fbfaf8";
const INK = "#1b1a18";
const MUTED = "#6f6b64";
const ACCENT = "#0d7377";

const serif = readFileSync("assets/og/Newsreader.ttf");
const sans = readFileSync("assets/og/Inter.ttf");

function frontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w-]+)\s*:\s*(.*)$/);
    if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, "");
  }
  return { data, body: raw.slice(match[0].length) };
}

// Markdown to something readable on a card.
function plain(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[*_`>#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function truncate(text, limit) {
  if (text.length <= limit) return text;
  const cut = text.slice(0, limit);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" "));
  return cut.slice(0, stop > 60 ? stop : limit).replace(/[\s.,;:]+$/, "") + "…";
}

// Notes open with their title in bold; the card shows it as its own line.
function splitNote(markdown) {
  const match = markdown.trim().match(/^\*\*(.+?)\*\*\s*/);
  if (!match) return { title: null, rest: markdown };
  return { title: match[1].trim(), rest: markdown.trim().slice(match[0].length) };
}

const row = (children, style = {}) => ({
  type: "div",
  props: { style: { display: "flex", ...style }, children },
});
const text = (value, style) => ({ type: "div", props: { style: { display: "flex", ...style }, children: value } });

function card({ kicker, headline, footnote }) {
  const size = headline.length > 180 ? 40 : headline.length > 110 ? 48 : headline.length > 60 ? 58 : 68;
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: PAPER,
        padding: "72px 84px",
        borderTop: `12px solid ${ACCENT}`,
        fontFamily: "Inter",
      },
      children: [
        row([
          text(kicker, {
            fontFamily: "Inter",
            fontSize: 26,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: ACCENT,
          }),
        ]),
        row(
          [
            text(headline, {
              fontFamily: "Newsreader",
              fontSize: size,
              lineHeight: 1.22,
              color: INK,
              maxWidth: 1000,
            }),
          ],
          { flexGrow: 1, alignItems: "center" }
        ),
        row(
          [
            text(footnote, { fontFamily: "Inter", fontSize: 26, color: MUTED }),
            text("aymen.co", { fontFamily: "Inter", fontSize: 26, color: ACCENT }),
          ],
          { justifyContent: "space-between", borderTop: `2px solid #e6e3dc`, paddingTop: 28 }
        ),
      ],
    },
  };
}

async function render(spec, file) {
  const svg = await satori(card(spec), {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Newsreader", data: serif, weight: 400, style: "normal" },
      { name: "Inter", data: sans, weight: 500, style: "normal" },
    ],
  });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(file);
}

function readDir(dir) {
  return existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
}

const monthYear = (iso) =>
  new Date(iso).toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

mkdirSync(OUT_DIR, { recursive: true });
let made = 0;

for (const file of readDir("site/notes")) {
  const slug = basename(file, ".md");
  const { data, body } = frontmatter(readFileSync(join("site/notes", file), "utf8"));
  const { title, rest } = splitNote(body);
  await render(
    {
      kicker: title ? `Note · ${title}` : "Note",
      headline: truncate(plain(rest), 240),
      footnote: monthYear(data.date),
    },
    join(OUT_DIR, `${slug}.png`)
  );
  made++;
}

console.log(`✓ ${made} share cards written to ${OUT_DIR}`);
