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

function image(base, alt, focus = '50% 50%') {
  const desktop = typeof focus === 'string' ? focus : (focus.desktop || '50% 50%')
  const mobile = typeof focus === 'string' ? focus : (focus.mobile || desktop)

  return { base, alt, focus: { desktop, mobile } }
}

export function getImageSources(base) {
  const sources = variants[base]

  if (!sources) {
    throw new Error(`No image files found for "${base}"`)
  }

  return sources
}

export const images = {
  hero: [
    image('hero/wedding-couple-celebration-recessional', 'Newlyweds walking through their guests after their wedding ceremony'),
    image('hero/wedding-couple-holding-hands-ceremony', 'Bride and groom holding hands during their wedding ceremony'),
    image('hero/singapore-multicultural-wedding-portrait', 'Newlyweds in traditional and formal dress on a red bridge in Singapore'),
  ],
  galleries: {
    weddingDay: [
      image('galleries/wedding-day/church-wedding-invitation-and-rings', 'Church wedding invitation and rings arranged on the bride’s veil'),
      image('galleries/wedding-day/sikh-wedding-couple-sunset-portrait', 'Sikh bride and groom sharing a quiet moment in the evening light', { desktop: '50% 35%', mobile: '50% 35%' }),
      image('galleries/wedding-day/newlyweds-kissing-in-singapore-church', 'Newlyweds kissing in the aisle of a Singapore church'),
      image('galleries/wedding-day/multicultural-newlyweds-guest-celebration', 'Newlyweds walking between cheering guests after their ceremony'),
      image('galleries/wedding-day/bride-and-groom-wedding-reception', 'Bride joining the groom during their wedding reception'),
      image('galleries/wedding-day/sikh-bride-red-wedding-dress-portrait', 'Sikh bride in a red wedding dress photographed outdoors'),
    ],
    preWedding: [
      image('galleries/pre-wedding/couple-intimate-black-and-white-portrait', 'Intimate black-and-white portrait of an engaged couple'),
      image('galleries/pre-wedding/couple-formal-portrait-singapore', 'Engaged couple in formal attire sharing a playful look', { desktop: '50% 25%', mobile: '50% 25%' }),
      image('galleries/pre-wedding/bride-walking-black-and-white-portrait', 'Black-and-white portrait of a bride walking in a flowing dress'),
      image('galleries/pre-wedding/couple-walking-formal-shoes-detail', 'Couple walking together in formal shoes during a pre-wedding shoot'),
      image('galleries/pre-wedding/couple-kissing-elevator-portrait', 'Engaged couple sharing a kiss in a warmly lit elevator'),
    ],
    proposal: [
      image('galleries/proposal/engagement-ring-hands-close-up', 'Newly engaged couple holding hands with the engagement ring in view'),
      image('galleries/proposal/couple-under-fairy-lights', 'Newly engaged couple looking at each other under warm fairy lights'),
      image('galleries/proposal/couple-kissing-after-proposal', 'Couple kissing beneath fairy lights after their proposal'),
      image('galleries/proposal/surprise-garden-marriage-proposal', 'Couple celebrating a surprise marriage proposal in a decorated garden'),
    ],
  },
  people: {
    photographer: image('people/madhu-ijos-moments-photographer', 'Madhu, founder and lead photographer of ijós Moments', { desktop: '50% 0%', mobile: '50% 0%' }),
    testimonial: image('people/marianna-pascal-wedding-client', 'Marianna Pascal photographed on her wedding day'),
  },
  sections: {
    packages: image('sections/wedding-photography-packages', 'Sikh bride in a red wedding dress beside an ornate white colonnade'),
    contact: image('sections/contact-singapore-wedding-photographer', ''),
  },
}
