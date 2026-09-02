// Renders a share card per note, so a note pasted into LinkedIn or X shows its
// own text. Posts use their own cover image instead.
// Runs after Eleventy; the templates point at /og/<slug>.png.
import { readFileSync, readdirSync, mkdirSync, existsSync, writeFileSync } from "node:fs";
import { join, basename } from "node:path";
import { execFileSync } from "node:child_process";
import satori from "satori";
import sharp from "sharp";
import { plain, truncate } from "../lib/markdown-text.cjs";
import categories from "../lib/categories.cjs";

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

function card({ kicker, headline, footnote, sub }) {
  // A short title alone leaves the middle of the card empty, so a post also
  // sets its description underneath; the headline gives way a little for it.
  const long = headline.length > 180 ? 40 : headline.length > 110 ? 48 : headline.length > 60 ? 58 : 68;
  const size = sub ? Math.min(long, 56) : long;
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
            {
              type: "div",
              props: {
                style: { display: "flex", flexDirection: "column", maxWidth: 1000 },
                children: [
                  text(headline, {
                    fontFamily: "Newsreader",
                    fontSize: size,
                    lineHeight: 1.22,
                    color: INK,
                  }),
                  ...(sub
                    ? [
                        text(sub, {
                          fontFamily: "Inter",
                          fontSize: 27,
                          lineHeight: 1.45,
                          color: MUTED,
                          marginTop: 22,
                        }),
                      ]
                    : []),
                ],
              },
            },
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

// A post can put its own diagram on its card with `ogDiagram: <generator>`,
// naming a script in scripts/diagrams. The drawing is the article's signature,
// and it says more at feed size than another block of set type.
const DG_STYLE = `<style>
 .dg-box,.dg-line{fill:none;stroke:${INK};stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}
 .dg-box2{opacity:.4}
 .dg-human,.dg-back,.dg-runtime{stroke:${ACCENT}}
 .dg-back{stroke-dasharray:5 4} .dg-runtime{stroke-dasharray:6 4}
 .dg-ghost{opacity:.45} .dg-zone{opacity:.5;stroke-dasharray:2 7}
 .dg-stop{stroke:${MUTED};stroke-width:2} .dg-divider{stroke:#e6e3dc;stroke-dasharray:3 6}
 .dg-label,.dg-sub,.dg-edge{fill:${INK};font-family:'DejaVu Sans Mono',monospace;font-size:13px;stroke:none}
 .dg-sub,.dg-edge,.dg-muted-label{fill:${MUTED}}
 .dg-sub,.dg-edge{font-size:11px}
 .dg-human-text,.dg-edge-back{fill:${ACCENT}}
</style>`;

async function diagramImage(name, width) {
  const raw = execFileSync("node", [join("scripts/diagrams", `${name}.mjs`)], { encoding: "utf8" });
  const svg = raw
    .replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')
    .replace("</desc>", "</desc>" + DG_STYLE);
  const ratio = (() => {
    const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
    return vb ? Number(vb[2]) / Number(vb[1]) : 0.6;
  })();
  const height = Math.round(width * ratio);
  const buffer = await sharp(Buffer.from(svg), { density: 300 })
    .resize(width * 2, height * 2, { fit: "contain", background: PAPER })
    .flatten({ background: PAPER })
    .png()
    .toBuffer();
  return { src: `data:image/png;base64,${buffer.toString("base64")}`, width, height };
}

function diagramCard({ kicker, headline, footnote, diagram }) {
  const size = headline.length > 90 ? 36 : headline.length > 52 ? 42 : 50;
  return {
    type: "div",
    props: {
      style: {
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "space-between", backgroundColor: PAPER,
        padding: "64px 76px", borderTop: `12px solid ${ACCENT}`, fontFamily: "Inter",
      },
      children: [
        row([text(kicker, { fontSize: 26, letterSpacing: 3, textTransform: "uppercase", color: ACCENT })]),
        row(
          [
            {
              type: "div",
              props: {
                style: { display: "flex", width: 430, paddingRight: 34 },
                children: [text(headline, { fontFamily: "Newsreader", fontSize: size, lineHeight: 1.2, color: INK })],
              },
            },
            {
              type: "div",
              props: {
                style: { display: "flex", alignItems: "center" },
                children: [{ type: "img", props: { src: diagram.src, width: diagram.width, height: diagram.height } }],
              },
            },
          ],
          { flexGrow: 1, alignItems: "center" }
        ),
        row(
          [
            text(footnote, { fontSize: 26, color: MUTED }),
            text("aymen.co", { fontSize: 26, color: ACCENT }),
          ],
          { justifyContent: "space-between", borderTop: `2px solid #e6e3dc`, paddingTop: 28 }
        ),
      ],
    },
  };
}

// The reading page is a shelf, so its card is the shelf: the covers carry it
// and the row runs off the right edge rather than stopping short.
const SHELF_W = 190;
const SHELF_H = 285;

async function coverImage(path) {
  const buffer = await sharp(path)
    .resize(SHELF_W * 2, SHELF_H * 2, { fit: "cover" })
    .jpeg({ quality: 82 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

function shelfCard({ headline, covers }) {
  return {
    type: "div",
    props: {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: PAPER,
        paddingTop: 66,
        borderTop: `12px solid ${ACCENT}`,
        fontFamily: "Inter",
        overflow: "hidden",
      },
      children: [
        row(
          [
            text("Reading", {
              fontSize: 26,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: ACCENT,
            }),
            text("aymen.co", { fontSize: 26, color: MUTED }),
          ],
          { padding: "0 84px", justifyContent: "space-between" }
        ),
        row(
          [
            text(headline, {
              fontFamily: "Newsreader",
              fontSize: 52,
              lineHeight: 1.22,
              color: INK,
              maxWidth: 900,
            }),
          ],
          { padding: "34px 84px 0" }
        ),
        row(
          covers.map((src) => ({
            type: "img",
            props: {
              src,
              width: SHELF_W,
              height: SHELF_H,
              style: { borderRadius: 3, border: "1px solid rgba(27,26,24,0.1)" },
            },
          })),
          { marginTop: "auto", paddingLeft: 84, gap: 16, flexShrink: 0 }
        ),
      ],
    },
  };
}

async function render(tree, file) {
  const svg = await satori(tree, {
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
  await render(
    card({
      kicker: data.title ? `Note · ${data.title}` : "Note",
      headline: truncate(plain(body), 240),
      footnote: monthYear(data.date),
    }),
    join(OUT_DIR, `${slug}.png`)
  );
  made++;
}

// A post with no picture of its own gets a card built from its title, so a
// shared link never falls back to the site-wide card. Anything with `og`,
// `cover` or `thumb` already has a real image and is left alone.
const firstCategory = (raw) =>
  (raw || "").replace(/[[\]"']/g, "").split(",")[0].trim();

for (const file of readDir("site/posts")) {
  const { data } = frontmatter(readFileSync(join("site/posts", file), "utf8"));
  if (data.og || data.cover || data.thumb) continue;

  const slug = firstCategory(data.categories);
  const label = categories.CATEGORY_LABELS[slug] || slug;
  const kicker = data.format === "letter" ? "Open letter" : label;
  const headline = data.title || "";
  const tree = data.ogDiagram
    ? diagramCard({
        kicker,
        headline,
        footnote: monthYear(data.date),
        diagram: await diagramImage(data.ogDiagram, 584),
      })
    : card({
        kicker,
        headline: data.seoTitle || headline,
        sub: truncate(data.description || "", 190) || undefined,
        footnote: monthYear(data.date),
      });
  await render(tree, join(OUT_DIR, `${basename(file, ".md")}.png`));
  made++;
}

// One card for the reading page, built from the same books.json the page reads.
const books = JSON.parse(readFileSync("site/_data/books.json", "utf8"));
const { data: readingData } = frontmatter(readFileSync("site/reading.njk", "utf8"));
await render(
  shelfCard({
    headline: readingData.lead || "Not a recommendation list. Just what is on the shelf.",
    // Seven fills the frame; the rest would be cut off anyway.
    covers: await Promise.all(books.slice(0, 7).map((b) => coverImage(join("public", b.cover)))),
  }),
  join(OUT_DIR, "reading.png")
);
made++;

console.log(`✓ ${made} share cards written to ${OUT_DIR}`);
