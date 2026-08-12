# aymen.co

Personal website and blog of [Labidi Aymen](https://aymen.co) — a fully static site built with [Eleventy](https://www.11ty.dev/) and designed to be hosted on [Cloudflare Pages](https://pages.cloudflare.com/).

## Stack

- **Eleventy 3** — static site generator, zero client-side JavaScript (except the ~10-line theme toggle)
- **Nunjucks** templates, Markdown content
- **Prism** syntax highlighting at build time
- Self-hosted **Inter** variable font
- Light/dark theme with system preference detection

## Structure

```
site/
  _data/site.json      # Site metadata, nav, social links
  _includes/           # Layouts and partials
  posts/               # All blog posts (markdown, one file per post)
  css/main.css         # The entire stylesheet
  *.njk                # Pages: home, blog, projects, about, 404, feed, sitemap
public/                # Passthrough assets: images, fonts, _headers, _redirects
eleventy.config.js     # Collections, filters, category labels
```

Post URLs keep the original `/{category}/{slug}/` scheme (e.g. `/ai/nuraly-how-we-ship-code-with-ai-agents/`), so existing links and SEO are preserved.

## Development

```sh
npm install
npm run dev     # local server with live reload
npm run build   # outputs the static site to _site/
```

## Deploying to Cloudflare

The site deploys as a Cloudflare **Worker** serving static assets (`wrangler.jsonc`
points at `_site`), not as a Pages project.

1. In the [Cloudflare dashboard](https://dash.cloudflare.com/), open the Worker and
   connect this repository under **Settings → Build**.
2. Use these settings:
   - **Path:** `/`
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy`
3. Add `aymen.co` as a **custom domain** on the Worker. The site's canonical URLs,
   sitemap and feed all declare `https://aymen.co`, so this step is what makes those
   correct — until the domain points here, search engines are told the canonical copy
   lives somewhere else.

The Worker name in `wrangler.jsonc` must match the Worker in the dashboard, otherwise
a deploy creates a second Worker instead of updating the existing one.

Every push to the production branch triggers a rebuild and deploy. Preview deployments are created for other branches automatically.

Security headers and cache policy live in `public/_headers`; legacy URL redirects live in `public/_redirects` — both are picked up by Cloudflare Pages natively.

## Writing a new post

Create `site/posts/my-post-slug.md`:

```md
---
title: "My Post Title"
date: 2026-08-11
categories: ["ai"]
cover: "/images/my-cover.jpg"        # optional
description: "One-line summary."     # optional, used for SEO + RSS
permalink: "/ai/my-post-slug/"
---

Post content in markdown…
```
