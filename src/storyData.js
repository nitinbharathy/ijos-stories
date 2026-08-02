import { images } from './imageCatalog'

export const stories = [
  {
    slug: 'sikh-wedding-portrait-story-singapore',
    category: 'Wedding Day',
    location: 'Singapore',
    title: 'A Sikh Wedding Portrait Story in Singapore',
    excerpt: 'Rich red bridal details, quiet portraiture and warm evening light shape this intimate wedding edit.',
    metaTitle: 'Sikh Wedding Portraits Singapore | ijós Moments',
    metaDescription: 'A curated Sikh wedding portrait story photographed in Singapore, featuring warm sunset light, detailed bridal portraits and natural connection.',
    heroImage: images.galleries.weddingDay[1],
    servicePath: '/wedding-day',
    serviceLabel: 'View wedding-day service',
    selectedService: 'Actual day coverage',
    introduction: 'This short portrait story moves between the couple together and individual bridal portraits, allowing the colour, embroidery and emotion of the wedding attire to take centre stage.',
    sections: [
      {
        eyebrow: 'The bridal portrait',
        title: 'Colour and detail against the landscape',
        body: 'For the bridal portrait, the deep green setting creates contrast with the red fabric and intricate gold details. The composition leaves enough stillness around the bride for the jewellery, embroidery and henna to remain visible without losing the natural atmosphere.',
        image: images.galleries.weddingDay[5],
      },
      {
        eyebrow: 'A change of setting',
        title: 'A softer architectural frame',
        body: 'The final portrait shifts into a brighter setting. Repeating white arches and carved columns create a calm frame, while the bride’s red attire remains the visual focus. Together, the locations give the portrait set variety without changing its understated mood.',
        image: images.sections.packages,
      },
    ],
  },
  {
    slug: 'singapore-pre-wedding-portrait-story',
    category: 'Pre-wedding',
    location: 'Singapore',
    title: 'A Playful Pre-wedding Portrait Story in Singapore',
    excerpt: 'Playful glances, close black-and-white frames and warm interior light give this portrait session its energy.',
    metaTitle: 'Pre-wedding Portrait Story Singapore | ijós Moments',
    metaDescription: 'A Singapore pre-wedding portrait story moving between playful formal portraits, intimate black-and-white frames and warm interior light.',
    heroImage: images.galleries.preWedding[1],
    servicePath: '/pre-wedding',
    serviceLabel: 'View pre-wedding service',
    selectedService: 'Pre-wedding shoots',
    introduction: 'This portrait story balances light-hearted expressions with closer, quieter frames. The shifts in distance, colour and setting create variety while keeping the couple’s connection at the centre.',
    sections: [
      {
        eyebrow: 'A closer frame',
        title: 'Quiet connection in black and white',
        body: 'Removing colour places the emphasis on expression, gesture and the small distance between the couple. The close crop gives the photograph an intimate, timeless quality.',
        image: images.galleries.preWedding[0],
      },
      {
        eyebrow: 'Warm interior light',
        title: 'A more cinematic final portrait',
        body: 'The final setting introduces warm reflective surfaces and deeper shadows. It changes the pace of the story while keeping the couple relaxed and fully present with each other.',
        image: images.galleries.preWedding[4],
      },
    ],
  },
  {
    slug: 'garden-proposal-fairy-lights-singapore',
    category: 'Proposal',
    location: 'Singapore',
    title: 'A Garden Proposal Under Fairy Lights',
    excerpt: 'A glowing garden setting, an intimate ring detail and an unguarded celebration shape this evening proposal story.',
    metaTitle: 'Garden Proposal Photography Singapore | ijós Moments',
    metaDescription: 'An evening garden proposal story in Singapore, photographed among warm fairy lights with natural reactions and close details.',
    heroImage: images.galleries.proposal[3],
    servicePath: '/proposal',
    serviceLabel: 'View proposal service',
    selectedService: 'Proposal shoot',
    introduction: 'This proposal story moves from the first celebration into the quieter details that followed. Warm fairy lights connect the photographs and preserve the atmosphere of the evening.',
    sections: [
      {
        eyebrow: 'The detail',
        title: 'A quiet frame for the new ring',
        body: 'A close photograph of joined hands records the ring without losing the warmth and softness of the surrounding lights. It becomes a small pause within the wider celebration.',
        image: images.galleries.proposal[0],
      },
      {
        eyebrow: 'After the yes',
        title: 'A moment together beneath the lights',
        body: 'Once the surprise has settled, the photographs become quieter and more observational. The lights form a warm backdrop while the couple settles into the moment together.',
        image: images.galleries.proposal[1],
      },
    ],
  },
]

export function getStory(slug) {
  return stories.find((story) => story.slug === slug)
}

export function getStoryStructuredData(story, origin) {
  const pageUrl = `${origin}/stories/${story.slug}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${pageUrl}#story`,
    url: pageUrl,
    headline: story.title,
    description: story.metaDescription,
    author: { '@type': 'Person', name: 'Madhu' },
    publisher: { '@type': 'Organization', name: 'ijós Moments' },
    about: { '@type': 'Service', name: `${story.category} photography in Singapore` },
  }
}
