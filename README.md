# The Big Bang Collective website

**Status**
- **What:** static site for The Big Bang Collective (physics at music festivals), built with Astro and Tailwind.
- **Live:** [www.thebigbangcollective.com](https://www.thebigbangcollective.com), deployed from `main` by GitHub Actions (`.github/workflows/deploy.yml`) to GitHub Pages. Pushing to `main` publishes.
- **State:** maintained.
- **Gotchas:**
  - Videos are not in the repo. They live in the S3 bucket `thebigbangcollective`, served through CloudFront (`d18az0o70pr8ah.cloudfront.net`). Each video also has an adaptive HLS copy at `hls/<slug>/hd.m3u8`, where the slug is the file name lower-cased with other characters turned into `-` (see `src/util/video.js`).
  - Each video's still is `src/assets/posters/<slug>.jpg`. Backstage Science stills and cut-outs are `src/assets/backstage/<id>.jpg` and `<id>-cutout.png`.
  - Festival content for each year is in `src/content/years/<year>.md`; each festival's photos are a folder under `src/assets/images/<year>/`.
  - Don't leave stray copies (e.g. Finder's `photo 2.jpg`) in `src/assets`: glob imports can pull them into the build.
  - Resize photos before adding them (2000px on the long side, under 2 MB). Large originals stay in the git history for good.

## Develop

```sh
npm install
npm run dev       # localhost:4321
npm run build     # outputs to ./dist/
npm run preview   # serve the build
```

## Layout

```text
src/
  assets/      images (posters, backstage, festival photos, gallery, site)
  components/  Astro components
  content/     per-year festival data
  layouts/     page shells
  pages/       routes
  styles/      global CSS
  util/        client-side helpers (video, lightbox, header, bubbles)
public/        files served as-is
```

## Maintainers

- [Orlando](https://github.com/Orlando-PB)
- [Kaj Siebert](https://github.com/kws)
