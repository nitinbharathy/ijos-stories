# ijós Moments website guide

This guide explains how to update the website locally, manage its images, and publish changes to Cloudflare Pages.

## Preview changes locally

Install the project dependencies once:

```sh
npm install
```

Start the local website:

```sh
npm run dev
```

Open the local address shown in the terminal. Changes to the website normally appear automatically after a file is saved. Refresh the page if an image replacement does not appear immediately.

## Replace an existing image

Website images are stored in `src/assets/images/` and grouped by purpose:

```text
hero/
galleries/
  wedding-day/
  pre-wedding/
  proposal/
people/
sections/
```

To replace an image without changing the website code, keep its existing descriptive base filename and replace one or more matching files:

- `name.avif` — preferred when present
- `name.webp` — modern fallback when present
- `name.jpg` or `name.jpeg` — universal fallback

For example, these files are treated as versions of the same photograph:

```text
hero/wedding-couple-celebration-recessional.avif
hero/wedding-couple-celebration-recessional.webp
hero/wedding-couple-celebration-recessional.jpg
```

AVIF and WebP are optional. Keep at least one WebP, JPEG, or JPG version so the image always has a fallback.

If the replacement photograph depicts something different, update its alt text in `src/imageCatalog.js`. Accurate alt text helps accessibility and image SEO.

## Add, remove, or reorder images

After adding the image files to the appropriate folder, update `src/imageCatalog.js` to:

- add or remove the image entry;
- place it in the required display order; and
- provide accurate alt text.

Use lowercase, descriptive filenames with words separated by hyphens. Avoid camera-generated names such as `IMG_1234.jpg`.

## Image metadata structure

Every displayed photograph has one metadata entry in `src/imageCatalog.js`:

```js
image('folder/descriptive-base-filename', 'Accurate description of the photograph')
```

Each entry contains:

- `base` — the path inside `src/assets/images/`, without `.avif`, `.webp`, `.jpg`, or `.jpeg`;
- `alt` — a concise, human-readable description of what is visible in the photograph.

For example:

```js
image(
  'galleries/wedding-day/newlyweds-kissing-in-singapore-church',
  'Newlyweds kissing in the aisle of a Singapore church',
)
```

The metadata is arranged to match the website sections:

```js
export const images = {
  hero: [
    image('hero/example-image', 'Description of the hero photograph'),
  ],
  galleries: {
    weddingDay: [],
    preWedding: [],
    proposal: [],
  },
  people: {
    photographer: image('people/example-photographer', 'Description'),
    testimonial: image('people/example-client', 'Description'),
  },
  sections: {
    packages: image('sections/example-packages', 'Description'),
    contact: image('sections/example-contact', ''),
  },
}
```

The order of entries in a hero or gallery array is the order shown on the website. Use an empty alt value (`''`) only when an image is purely decorative and the surrounding content already provides its meaning.

The `base` value must match at least one real image file. Multiple formats with the same base value are automatically treated as variants of the same photograph.

## Check the production version

Before publishing, build and test the website:

```sh
npm run build
npm run test:sites
```

The Cloudflare Pages files are generated in `dist/client/`. Do not edit files inside `dist/` directly because they are recreated by every build.

The build also generates `robots.txt` and `sitemap.xml`. Cloudflare Pages supplies its deployment address through `CF_PAGES_URL`. After connecting a custom production domain, set the Cloudflare Pages environment variable `SITE_URL` to that full address, such as `https://www.example.com`, so the sitemap uses the canonical domain.

The business structured data is in the root `index.html` file, inside the script with `id="business-structured-data"`. Review that block whenever the business name, contact details, service area, founder details, Instagram profile, or services change. Add the final website URL, business identifier, logo, and representative image after the production domain is confirmed.

## Publish through Git and Cloudflare Pages

The website is published through Cloudflare Pages Git integration. Configure the Cloudflare Pages project once with:

- Build command: `npm run build`
- Build output directory: `dist/client`
- Root directory: the repository root
- Framework preset: Vite, or None with the settings above

For each website update, commit the changes and push them to the branch connected to Cloudflare Pages:

```sh
git add -A
git commit -m "Describe the website update"
git push
```

Cloudflare Pages will build and publish the pushed commit automatically.

After the Git remote and Cloudflare Pages project are connected, a manual upload is not required. A local commit by itself does not update the live site; the commit must also be pushed.
