# wblacklock.com

Portfolio of William Blacklock. Next.js 15 (App Router) + React 19 + Tailwind, deployed on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

> While the dev server is running, typecheck with `npx tsc --noEmit`.
> Do **not** run `npm run build` at the same time — both write to `.next`, and
> the production build will overwrite the chunks the dev server is serving,
> which surfaces as `Cannot find module './XXX.js'`. If that happens, stop the
> server, `rm -rf .next`, and start it again.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build |
| `npm start` | Serve a production build |
| `npm run lint` | ESLint |

## Content

All content is data-driven — no CMS. Edit these and the pages follow:

| File | Holds |
| --- | --- |
| [`src/data/projects.json`](src/data/projects.json) | Project cards: title, client, services, tools, thumbnail |
| [`src/data/projectExecutions.ts`](src/data/projectExecutions.ts) | Per-project detail sections (images, video, YouTube) |
| [`src/data/caseStudies.ts`](src/data/caseStudies.ts) | Long-form case studies (IBM Garage, Beast Putty) |
| [`src/data/posts.json`](src/data/posts.json) | Journal articles |
| [`src/data/imageRatios.json`](src/data/imageRatios.json) | Generated aspect-ratio map — see below |

A project appears on the home page when `"featured": true`. The home page shows
`HOME_PROJECT_LIMIT` of them (currently 6, set at the top of
[`src/app/page.tsx`](src/app/page.tsx)) plus a "View all projects" link.

Journal content supports `## ` for a heading and `- ` for a bullet; everything
else renders as a paragraph.

### Adding images or video

`imageRatios.json` maps each asset to its true aspect ratio so the detail pages
can frame images and video at their real proportions instead of cropping them
into a fixed box. **After adding media to `public/images/`, regenerate it** —
anything missing from the map falls back to a 4:3 frame and will be cropped.

Videos should also be encoded with **faststart** (the `moov` atom ahead of
`mdat`). Without it a browser must download the entire file before showing a
single frame, so the video looks broken:

```bash
ffmpeg -i input.mp4 -c copy -movflags +faststart output.mp4
```

## Deploying

Pushing to `main` triggers a production deploy on Vercel. Pull requests get
their own preview URL.
