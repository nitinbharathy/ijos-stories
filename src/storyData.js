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
    about: { '@type': 'Service', name: 'Wedding photography in Singapore' },
  }
}
