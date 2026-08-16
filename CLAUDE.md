# aymen.co

Personal site and blog. Eleventy → static files → Cloudflare Worker (`aymen-blog`)
serving `_site`. Every push to `master` triggers a build and deploy; a note is live
about a minute later.

## Posting a note

Notes are the short stuff — a status, a release, an opinion. This is the most
common request, often from a phone. Do it like this:

```
npm run note -- "Shipped Lumen 0.4. The compiler is 40% faster."
npm run note -- --title "On small teams" "Two people who trust each other outrun six."
```

Then `npm run build`, confirm `node scripts/check-assets.mjs` passes, commit and push.

Rules for this task:

- **Use the author's words verbatim.** Fix a clear typo; do not rewrite, expand,
  polish, or add a closing line. This is published under his name.
- **Leave it untitled unless he gave a title.** A status is its own headline;
  untitled is the normal case and the layouts are built for it.
- A titled note is filed under its title slug (`/notes/on-small-teams/`); an untitled
  one is filed by date (`/notes/2026-08-14/`). A name already taken gets `-2`. The
  script handles all of this — don't hand-write the file.
- Don't invent notes. Never commit placeholder or example notes to `site/notes/`.

## Series

A post that belongs to a multi-part run carries `series: "Angular 14"` in its front
matter. Parts are ordered by date (oldest first); add `seriesOrder: n` only if a post
needs to sit out of chronological order. The box and the "next in series" link appear
automatically once two or more posts share a name — nothing else to wire up.

Only group posts the writing already treats as parts. Sharing a topic is what the
category is for.

## No emoji

Never use emoji — not in site content, commit messages, code comments, PR text, or
replies. He has asked for this explicitly. The typographic arrows already in the
templates (`→` on "All notes", `↗` on external links) are design elements, not
emoji, and stay.

## Git

- Commit as `Labidi Aymen <labidipc@aymen.co>`.
- **No `Co-Authored-By` and no `Claude-Session` trailers.** He has asked for this
  explicitly and more than once.
- Work on and push to `master`.

## Before pushing

`npm run build` then `node scripts/check-assets.mjs`. The guard catches broken image
paths, missing share cards and dropped pages — it has caught real bugs that the build
itself reported as successful.

GitHub Actions is failing at startup on this account (no runner, no logs, ~3s runs),
so CI is not a safety net right now. Verify locally.

## Gotchas

- **Eleventy strips a leading `YYYY-MM-DD-` from `fileSlug` *and* `filePathStem`.**
  `2026-08-13-2.md` slugs down to `"2"`. Use `page.inputPath` when you need the real
  filename (see `site/notes/notes.11tydata.js`).
- Images are optimised by a custom transform in `eleventy.config.js` that resolves
  sources from `public/images`. The official `eleventyImageTransformPlugin` rewrites
  paths incorrectly here — don't swap it back in.
- `markdownTemplateEngine` is `false`: old posts contain Angular `{{ }}` syntax that
  Nunjucks would otherwise try to evaluate.
- The article TOC is `position: fixed` and offset against the `46rem` container. If
  the container width changes, `.post-toc`'s `right` offset and its breakpoint must
  change with it.
