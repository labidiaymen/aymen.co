---
name: writing
description: House voice and editing rules for aymen.co. Use when drafting, rewriting, titling or line-editing anything published under Aymen's name — articles, notes, open letters, the descriptions and titles that go with them, and the LinkedIn or X posts that carry them. Also use when reviewing a draft he pasted in, or when a draft has been called "slop".
---

# Writing as Aymen

Everything here was learned by getting it wrong first. The rejected version is
kept next to the fix, because the fix alone does not teach the reflex.

## The one test

**Could only he have written this sentence?** If the sentence would survive
unchanged in any AI-newsletter post about the same topic, it is slop. That is
the word he uses, and it is the only review that matters.

## Voice

- **Short declarative sentences.** One idea each. Fragments are allowed and
  often better: *That was the wrong angle.* *Nothing shared.* *I review it.*
- **First person, from practice.** He writes from what he actually runs, not
  from what people generally do.
- **No connective tissue.** No "moreover", "it's worth noting", "in today's
  fast-moving landscape". Sentences butt up against each other.
- **No hedging.** State it or cut it.
- **No semicolons.** He objects to them by name: "sound like ai putting it".
  Split into two sentences.
- **No emoji anywhere** — content, commits, code comments, PR text, replies.
  The `→` and `↗` already in the templates are design elements and stay.

## What gets rejected

**Vague generalisations about other people.** These are the fastest way to
lose him.

> Most teams reading this already run one.
> Something plenty of teams were already doing.

become

> I never sat down to draw a graph. I have one anyway.

Watch for: *most teams, plenty of, a lot of, many teams, everyone, people are
now.* Replace the claim about others with a fact about himself.

**Trend and naming commentary.** Writing *about* the discourse rather than the
work. "Six weeks. That is the shelf life of a name in this field right now"
was cut for exactly this: "thats not my style". Name a thing once, then go
after the substance.

**Claims that fail on inspection.** "My IDE does none of it well" is false —
VS Code shows a diff perfectly well — and a reader who reviews in an IDE stops
there. The honest version is stronger: *My phone does all of that, anywhere.
My IDE does most of it too, and only while I am sitting in front of it.*
**Concede what is obviously true, then make the argument on what is left.**

**Definitions where a claim belongs.** Anyone can define graph engineering.
Only he can say a graph is a claim that you already know the shape of the work.

**Anything that shrinks the subject when the point is its weight.** A title
about "three boxes" read as a smaller job; the argument was leverage. Check
that the framing points the same direction as the argument.

## Openings

Open on a fact, not a claim. The claim lands harder once something concrete is
already on the table.

> Three months. That is how long some of you take to get a Copilot contract
> through legal.

> I have not opened my IDE in days.

Not: a definition, a scene, a rhetorical question, or a summary of what the
piece will argue.

## Endings

End on a hard statement. Never a question, never a call to action, never a
summary of what was just said.

> The desk had edges. The phone has none.

> It is already in production. It is just not on your invoice.

Admitting a cost is what makes the rest credible — the screen-time paragraph is
the reason people trust the pipeline paragraph. Keep the downside in.

## Titles

Short. A flat statement or a plain noun phrase. Never a name plus an explainer
after a dash or colon — unless the colon is doing real work, as in *Where the
leverage went: the graph engineer*.

- `Phone Programming`
- `Joule Code - Always-on agents`
- `It is already in production, just not on your invoice`

When a title needs to be findable as well as good, put the searchable version in
`seoTitle` and keep `title` sharp.

## Front matter

- `description:` renders as the visible lede above the first paragraph, so it
  **must not repeat the opening line**. He has caught this: "is this seams
  duplcate. ?". Lift a different sentence from further down instead.
- Untitled is the normal case for a note. A status is its own headline.
- `unlisted: true` for a draft. It builds at its URL and stays out of every
  list, the feed, the sitemap and search.

## When he supplies the text

**Use his words verbatim.** Fix a clear typo. Do not rewrite, expand, polish,
smooth a rhythm, or add a closing line. If a bracketed note to the author is
embedded in the draft (`[confirm this]`), strip it rather than publishing it —
but leave placeholders that mark a real gap visible, and list them back to him.

If a passage of his own has a flaw — a false claim, a semicolon — say so and
propose the fix. Do not apply it silently.

## Rhythm, when you do have to write

His paragraphs breathe in a pattern: a short declarative, then a longer
sentence that expands with a colon or a list, then a hard short close.

> One small VM per project. Each carries the exact environment that project
> needs: the runtime, the database, the credentials, the test data. Nothing
> shared.

A flattened version of the same content — everything welded into one block —
was rejected on rhythm alone. Keep the beats, and keep the one-line paragraph
that lands the point: *Then my phone buzzes.*

## Diagrams

A diagram earns its place when it **shows a mechanism the prose has to assert**.
It is not decoration and it is not a summary. If the caption has to claim
something the picture cannot show, the picture is wrong — a Console screenshot
was cut for exactly that.

**How they are made.** Hand-drawn inline SVG, generated by a script in
`scripts/diagrams/`, pasted into the post inside
`<figure class="diagram">`. No library, no image file, no build step: the SVG
lives in the markdown so a post can always draw its own pictures. Each generator
seeds its own PRNG, so re-running produces byte-identical output and the
markdown does not churn in git.

**The visual grammar**, carried by `.dg-*` classes in `site/css/main.css`, which
read the theme tokens so one drawing works in light and dark:

| Class | Means |
|---|---|
| `dg-box`, `dg-line` | drawn by a person, in `--text` |
| `dg-box2` | the second pass over every box at 40% — this is what makes it read as pen rather than a broken vector |
| `dg-runtime` | dashed accent: decided while running, not designed |
| `dg-ghost` | 45% opacity: stands for the ones you cannot count |
| `dg-zone` | the region deliberately left undrawn |
| `dg-human`, `dg-back` | accent: the human node, and the one conditional edge |
| `dg-stop` | a path that does not complete |

Use the accent for **two things at most** in one drawing, and make them the two
the caption is about.

**On the share card.** A post with a diagram sets `ogDiagram: <generator name>`
in its front matter, and the build draws the card from that diagram instead of
setting the title over empty space. The drawing is what makes the link
recognisable in a feed — nobody else's card looks hand-drawn. Posts without a
diagram keep the typographic card.

**Sizing.** The text column is 44rem, so a diagram wider than about 640px in its
viewBox gets clipped, and breaking it out of the column runs it under the fixed
TOC. Design to fit. A two-panel comparison usually does not — split it into two
figures instead and let the contrast land across them.

**Checks that actually catch things**, in order of what has gone wrong:

1. Text spilling outside the box it sits in. Compare each `<text>` rect against
   the `.dg-box` it overlaps. A text-vs-text collision check will not see this.
2. A path crossing its own label. No automated check catches this — look at it.
3. Duplicate `id` attributes when a page carries more than one SVG. Namespace
   them `dg2-title`, `dg3-title`.
4. Clipping and horizontal page overflow, at 1280 and 375, in both themes.

Render it and look at it. Every diagram in this repo needed a second pass, and
the defect was never the one the checks reported.

## Facts

Never invent a number, a date, a name, or an example. If research produced a
fact he has not confirmed, put it in the draft only if it is load-bearing, and
tell him it needs checking. He would rather have a gap than a fabrication.

## Social posts

LinkedIn and X want different shapes. X takes a flat assertion with no setup. On
LinkedIn the same post reads as abrupt, but padding it out is how it turns into
slop — so lead with a concrete first line, keep the same short sentences, and
let the section headings do the scanning. The rules above do not relax.
