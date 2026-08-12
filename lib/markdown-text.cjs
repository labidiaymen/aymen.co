// Markdown reduced to a plain sentence — used for OG card copy and for the
// social description meta, so the two always say the same thing.

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

// Front matter is stripped before the body is read; templates hand us raw input.
function stripFrontMatter(raw) {
  const match = raw.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/);
  return match ? raw.slice(match[0].length) : raw;
}

module.exports = { plain, truncate, stripFrontMatter };
