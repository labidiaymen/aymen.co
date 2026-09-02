# Diagram generators

Each script prints one `<svg>` to stdout; the output is pasted into the post it
belongs to, inside `<figure class="diagram">`. They are not part of `npm run
build` — the SVG lives in the markdown, so a post never depends on a build step
to render its own pictures.

Every generator seeds its own PRNG, so re-running one produces byte-identical
output and the markdown does not churn in git.

    node scripts/diagrams/pipeline-graph.mjs

Styling comes from `.dg-*` classes in `site/css/main.css`, which read the theme
tokens. Solid dark strokes are drawn by a person; dashed accent strokes are
decided at runtime.

Used by `site/posts/the-loop-lasted-six-weeks.md`.
