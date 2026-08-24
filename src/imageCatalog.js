import { importedPhotoMetadata } from './importedPhotoMetadata'

const imageFiles = import.meta.glob(
  './assets/images/**/*.{avif,webp,jpg,jpeg}',
  { eager: true, query: '?url', import: 'default' },
)

const variants = Object.entries(imageFiles).reduce((catalog, [path, url]) => {
  const relativePath = path.replace('./assets/images/', '')
  const extension = relativePath.split('.').pop().toLowerCase()
  const base = relativePath.slice(0, -(extension.length + 1))

  catalog[base] ??= {}
  catalog[base][extension === 'jpeg' ? 'jpg' : extension] = url
  return catalog
}, {})

function image(base, alt, focus = '50% 50%', metadata = {}) {
  const desktop = typeof focus === 'string' ? focus : (focus.desktop || '50% 50%')
  const mobile = typeof focus === 'string' ? focus : (focus.mobile || desktop)

  return { base, alt, focus: { desktop, mobile }, ...metadata }
}

const importedFocusById = {
  '2-madhu': { desktop: '50% 28%', mobile: '50% 24%' },
  dsc3540m: { desktop: '50% 66%', mobile: '50% 58%' },
  dsc4293: { desktop: '54% 50%', mobile: '55% 50%' },
  dsc3586: { desktop: '50% 50%', mobile: '50% 42%' },
  dsc3971: { desktop: '50% 45%', mobile: '50% 40%' },
  dsc06015: { desktop: '50% 40%', mobile: '50% 38%' },
  dsc06862: { desktop: '51% 42%', mobile: '52% 42%' },
  dsc7759: { desktop: '50% 42%', mobile: '50% 40%' },
  dsc8674: { desktop: '50% 56%', mobile: '51% 55%' },
  dsc8878: { desktop: '50% 42%', mobile: '50% 40%' },
  'victoriaandseancatholicweddingsg-63': '50% 50%',
}

function importedImage(entry) {
  const metadata = {
    orientation: entry.orientation,
    id: entry.id,
    ...(entry.chapter ? { chapter: entry.chapter } : {}),
  }
  return image(entry.base, entry.alt, importedFocusById[entry.id] || '50% 50%', metadata)
}

const importedStories = Object.fromEntries(
  Object.entries(importedPhotoMetadata.stories).map(([name, entries]) => [name, entries.map(importedImage)]),
)

export function getImageSources(base) {
  return base ? variants[base] || null : null
}

export const images = {
  hero: importedPhotoMetadata.hero.map(importedImage),
  galleries: {
    weddingDay: importedPhotoMetadata.galleries.weddingDay.map(importedImage),
    preWedding: importedPhotoMetadata.galleries.preWedding.map(importedImage),
    proposal: importedPhotoMetadata.galleries.proposal.map(importedImage),
  },
  people: {
    photographer: importedImage(importedPhotoMetadata.people.photographer),
    testimonial: image('people/marianna-pascal-wedding-client', 'Marianna Pascal photographed on her wedding day'),
  },
  stories: importedStories,
  sections: {
    packages: image('sections/wedding-photography-packages', 'Sikh bride in a red wedding dress beside an ornate white colonnade'),
    contact: image('sections/contact-singapore-wedding-photographer', ''),
  },
}
