# ijós Stories website guide

This guide explains how to update the website locally, manage its images, and publish changes through GitHub Pages or Sites.

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
image(
  'folder/descriptive-base-filename',
  'Accurate description of the photograph',
  { desktop: '50% 35%', mobile: '55% 30%' },
  { orientation: 'landscape' },
)
```

Each entry contains:

- `base` — the path inside `src/assets/images/`, without `.avif`, `.webp`, `.jpg`, or `.jpeg`;
- `alt` — a concise, human-readable description of what is visible in the photograph.
- `focus` — an optional focal point used when the image is cropped on desktop and mobile.
- `orientation` — optional metadata for landscape photographs. In story galleries, these span two desktop columns.

For example:

```js
image(
  'galleries/wedding-day/newlyweds-kissing-in-singapore-church',
  'Newlyweds kissing in the aisle of a Singapore church',
  { desktop: '50% 40%', mobile: '55% 32%' },
)
```

The metadata is arranged to match the website sections:

```js
export const images = {
  hero: [
    image('hero/example-image', 'Description of the hero photograph', { desktop: '50% 45%', mobile: '50% 30%' }),
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

The focal point is optional. If it is omitted, both desktop and mobile use the centre of the image (`50% 50%`). A single value such as `'50% 30%'` may be used when both screen sizes should share the same point.

## Image preparation guide

Prepare photographs for the place where they will appear. The website uses `object-fit: cover`, so an image can be cropped at the edges on different screen shapes. Keep faces, hands, rings and other important details away from the outer 15% of the frame.

The dimensions below are export sizes, not the exact size at which the image is drawn on every screen. They provide enough resolution for high-density displays without uploading the original camera file.

| Use | Preferred crop | Recommended export | Practical minimum | Target weight per file |
| --- | --- | --- | --- | --- |
| Homepage, service or story hero | Landscape 3:2 | 2000 × 1333 px | 1600 × 1067 px | AVIF 250–450 KB; WebP 350–650 KB; JPEG no more than 900 KB |
| Gallery/carousel portrait | Portrait 2:3 | 1200 × 1800 px | 800 × 1200 px | AVIF 100–220 KB; WebP 150–300 KB; JPEG no more than 450 KB |
| Photographer or testimonial portrait | Portrait 2:3 | 1200 × 1800 px | 800 × 1200 px | AVIF 120–240 KB; WebP 180–320 KB; JPEG no more than 500 KB |
| Packages or contact background | Landscape 5:4 | 2000 × 1600 px | 1600 × 1280 px | AVIF 250–450 KB; WebP 350–600 KB; JPEG no more than 850 KB |
| Story body photograph | Portrait 4:5 or 2:3 | 1600 × 2000 px or 1200 × 1800 px | 800 × 1200 px | AVIF 150–300 KB; WebP 220–400 KB; JPEG no more than 600 KB |
| Service-card image | Landscape 3:2 | 1600 × 1067 px | 1200 × 800 px | AVIF 180–320 KB; WebP 250–450 KB; JPEG no more than 650 KB |

If one photograph is reused as both a portrait gallery card and a full-width page hero, prepare it for the hero requirement. A small portrait file may look acceptable in a carousel but can become soft or crop awkwardly across a desktop hero.

### Export settings

- Convert the image to **sRGB** before exporting so colours remain predictable across browsers and phones.
- Export **AVIF at quality 45–55**. Start near 50 and inspect faces, fabric, jewellery and smooth gradients before lowering it.
- Export **WebP at quality 72–82**. Start near 78.
- Export a **progressive JPEG at quality 78–85** when JPEG is the fallback. Start near 82.
- Strip unnecessary camera and location metadata. Retain copyright metadata only if it is part of the business workflow.
- Do not enlarge a low-resolution photograph to meet the recommended dimensions; use the best available original instead.
- Judge quality visually. File-weight targets are budgets, not reasons to ship visible banding, smudged faces or damaged fine detail.

### Formats and variations supported now

For one photograph, use the same folder and base filename for every available format:

```text
galleries/wedding-day/newlyweds-church-aisle.avif
galleries/wedding-day/newlyweds-church-aisle.webp
galleries/wedding-day/newlyweds-church-aisle.jpg
```

The browser tries AVIF first, then WebP, then the available WebP or JPEG fallback. AVIF is optional. Always keep at least a WebP or JPEG/JPG file.

The current website supports **format variants**, but it does not yet select separate pixel-width variants with `srcset`. A filename such as `newlyweds-church-aisle-640.webp` is treated as a different photograph, not automatically as a smaller version of the same one.

Responsive width variants are a future optimisation. When that feature is added, useful widths will normally be 640, 960, 1440 and 2000 pixels. Until then, upload one sensibly compressed export at the recommended size instead of placing the full camera original in the repository.

### Text to provide with an image

Every image needs a descriptive filename and alt text. Images used in stories also need visible editorial information.

**Filename**

- Use lowercase words separated by hyphens.
- Describe the subject and, where genuinely useful, the event or location.
- Prefer `sikh-wedding-couple-sunset-portrait.jpg` over `IMG_4837.jpg`.
- Do not repeat keywords unnaturally or include private client information that should not appear publicly.

**Alt text**

- Describe what is visible and meaningful in one concise sentence, usually 8–20 words.
- Mention the action, people and setting when they help someone understand the photograph.
- Do not begin with “image of” or “photo of”. Assistive technology already announces that it is an image.
- Do not turn alt text into an SEO keyword list.
- Use `alt: ''` only for a purely decorative image whose meaning is already supplied by nearby text.

Example:

```js
image(
  'galleries/wedding-day/newlyweds-kissing-in-singapore-church',
  'Newlyweds kissing in the aisle of a Singapore church',
  { desktop: '50% 40%', mobile: '55% 32%' },
)
```

### Set the focal point

Focal points use two percentages: horizontal position from the left, then vertical position from the top. For example, `65% 30%` places the important subject 65% across and 30% down the photograph.

Use one value when the same point works everywhere:

```js
image('hero/example-image', 'Alt text', '65% 30%')
```

Use separate values when the mobile crop needs a different emphasis:

```js
image(
  'hero/example-image',
  'Alt text',
  { desktop: '65% 35%', mobile: '52% 28%' },
)
```

- Start at `50% 50%`, then move the point toward the face or other essential detail.
- Keep both numbers between `0%` and `100%`.
- Changing the focal point does not change the file or create a new crop; it controls how the existing image is positioned inside cropped frames.
- Check the result on both desktop and mobile. Extremely different aspect ratios may still require a separately prepared crop in a future art-direction workflow.
- Because focal points live in `src/imageCatalog.js`, every use of the same catalogue image receives the same desktop and mobile focus.

## Create or edit a story

Each story has its own content file in `src/stories/`. The shared template is in `src/StoryPage.jsx`; do not create a separate page component for each story.

The hero and listing information are required. Everything below the hero is made from optional blocks. Blocks appear in their listed order and may be omitted or repeated:

- `introduction` — one or more opening paragraphs;
- `imageText` — a photograph with optional eyebrow and heading plus paragraphs;
- `text` — a text-only passage;
- `fullImage` — a wide photograph with an optional caption;
- `quote` — a quotation with an optional attribution;
- `gallery` — any number of photographs using the lightbox viewer.

```js
export const exampleStory = {
  slug: STORY_SLUGS.example,
  category: 'Wedding Day',
  location: 'Singapore',
  heroLocation: 'Couple names',
  title: 'Story title',
  excerpt: 'Short description shown on the Stories page.',
  metaTitle: 'SEO page title | ijós Stories',
  metaDescription: 'Concise SEO description of the story.',
  heroImage: images.stories.example.hero,
  servicePath: '/wedding-day',
  serviceLabel: 'View wedding-day service',
  selectedService: 'Actual day coverage',
  blocks: [
    { type: 'introduction', paragraphs: ['Opening paragraph.'] },
    {
      type: 'imageText',
      eyebrow: 'Day 1',
      title: 'Section heading',
      paragraphs: ['Section text.'],
      image: images.stories.example.dayOne,
      imagePosition: 'left',
    },
    {
      type: 'gallery',
      label: 'Couple wedding gallery',
      images: images.stories.example.gallery,
    },
  ],
}
```

For `imageText`, omit `imagePosition` to alternate left and right automatically. Use `'left'` or `'right'` only when composition requires a specific side. Set `closing: false` to remove the standard closing section, or `showContact: false` to omit the contact section.

To add a story:

1. Put its photographs under `src/assets/images/stories/descriptive-story-name/`, with useful subfolders such as `hero/`, `day-1/` and `gallery/`.
2. Add the photographs and alt text to `src/imageCatalog.js`.
3. Add its slug to `src/storyRoutes.js`; this also adds the URL to the generated sitemap.
4. Create its content file in `src/stories/`.
5. Import it and add it to the `stories` array in `src/storyData.js`. The array order controls the order on `/stories`.

Alt text is not a caption and is normally not shown on the page. Provide an approved title, category, location, listing excerpt, content blocks, relevant service, SEO title and SEO description.

Keep names or identifying details out of public text unless the couple has approved their use. Service-page wording is stored in `src/serviceData.js`; the homepage hero heading and section copy are stored in `src/App.jsx`.

### Image checklist before publishing

- The crop works on both a wide desktop screen and a narrow phone.
- Important details remain inside the central safe area.
- The image is sharp at its largest intended placement.
- File dimensions and weight are close to the relevant budget above.
- At least one WebP or JPEG fallback exists.
- All format variants use exactly the same folder and base filename.
- The filename is descriptive and the alt text matches the actual photograph.
- Public names, locations and story details have client approval where required.
- The website has been checked after replacement because browser cropping may differ from the editing preview.

## Check the production version

Before publishing, build and test the website:

```sh
npm run build
npm run test:sites
```

The Cloudflare Pages files are generated in `dist/client/`. Do not edit files inside `dist/` directly because they are recreated by every build.

The build also generates `robots.txt` and `sitemap.xml`. Cloudflare Pages supplies its deployment address through `CF_PAGES_URL`. After connecting a custom production domain, set the Cloudflare Pages environment variable `SITE_URL` to that full address, such as `https://www.example.com`, so the sitemap uses the canonical domain.

The business structured data is in the root `index.html` file, inside the script with `id="business-structured-data"`. Review that block whenever the business name, contact details, service area, founder details, Instagram profile, or services change. Add the final website URL, business identifier, logo, and representative image after the production domain is confirmed.

## Publish through GitHub Pages

Push the `main` branch to the `nitinbharathy/ijos-stories` repository. The included GitHub Actions workflow builds and deploys the site automatically to:

`https://nitinbharathy.github.io/ijos-stories/`

In the repository settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

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
