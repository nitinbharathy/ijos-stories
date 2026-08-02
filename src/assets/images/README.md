# Website image guide

Images are grouped by where they appear on the site. To replace an image without changing code, keep its existing descriptive base name and replace any of these files:

- `name.avif` — preferred when present
- `name.webp` — modern fallback when present
- `name.jpg` or `name.jpeg` — universal fallback

The site checks the files during each build. It only adds an AVIF or WebP `<source>` when that file exists, so a missing optional format will not create a broken image. Keep at least one WebP or JPEG version for every image.

Files sharing a base name are treated as versions of the same image. For example:

```text
hero/wedding-couple-celebration-recessional.avif
hero/wedding-couple-celebration-recessional.webp
hero/wedding-couple-celebration-recessional.jpg
```

Replacing a file keeps the existing image order and alt text. When adding a new image, changing the order, or changing what a photograph depicts, also update `src/imageCatalog.js` so the visible image has accurate alt text.
