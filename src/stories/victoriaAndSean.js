import { images } from '../imageCatalog'
import { STORY_SLUGS } from '../storyRoutes'

export const victoriaAndSeanStory = {
  slug: STORY_SLUGS.victoriaAndSean,
  category: 'Wedding Day',
  tags: ['Catholic wedding', 'Church wedding', 'Tea ceremony', 'Hotel reception'],
  location: 'Singapore',
  heroLocation: 'Victoria and Sean',
  title: 'Victoria and Sean | Catholic wedding at Church of St Teresa and Reception at Goodwood Park Hotel',
  excerpt: 'A heartfelt Catholic wedding at the Church of St Teresa, followed by a tea ceremony and an evening reception at Goodwood Park Hotel.',
  metaTitle: 'Catholic Wedding at Church of St Teresa | ijós Stories',
  metaDescription: 'Victoria and Sean’s Catholic wedding at the Church of St Teresa in Singapore, with a tea ceremony and reception at Goodwood Park Hotel.',
  heroImage: images.galleries.weddingDay[2],
  servicePath: '/wedding-day',
  serviceLabel: 'View wedding-day service',
  selectedService: 'Actual day coverage',
  blocks: [
    {
      type: 'introduction',
      paragraphs: [
        'Victoria and Sean’s wedding day began with Victoria getting ready surrounded by her parents. There were quiet, intimate moments as her mum helped her with her jewellery and both her parents helped veil her before her first look.',
      ],
    },
    {
      type: 'imageText',
      eyebrow: 'A quiet beginning',
      title: 'Getting ready with family',
      paragraphs: [
        'Before the celebrations gathered pace, the morning left room for the smaller moments: jewellery, the veil and the anticipation of seeing Sean for the first time.',
      ],
      image: images.galleries.weddingDay[0],
      imagePosition: 'left',
    },
    {
      type: 'imageText',
      eyebrow: 'The ceremony',
      title: 'A Catholic wedding at the Church of St Teresa',
      paragraphs: [
        'From there, we headed to the Church of St Teresa for their Catholic wedding, along with a bridal party shoot and group photos with family and friends.',
      ],
      image: images.galleries.weddingDay[2],
      imagePosition: 'right',
    },
    {
      type: 'imageText',
      eyebrow: 'Between celebrations',
      title: 'Tea ceremony traditions',
      paragraphs: [
        'The day continued with a tea ceremony before everyone gathered at Goodwood Park Hotel for the evening reception.',
      ],
      image: images.galleries.weddingDay[3],
      imagePosition: 'left',
    },
    {
      type: 'imageText',
      eyebrow: 'Goodwood Park Hotel',
      title: 'An evening of emotion and laughter',
      paragraphs: [
        'There were plenty of emotional moments along the way, especially with Victoria’s sisters and parents, but the tears soon gave way to laughter as the couple mingled with their friends and celebrated together.',
        'And that felt very fitting for Victoria: a day filled with love, emotion, and plenty of her bubbly energy.',
      ],
      image: images.galleries.weddingDay[4],
      imagePosition: 'right',
    },
    {
      type: 'gallery',
      label: 'Victoria and Sean Catholic wedding gallery',
      images: [
        images.galleries.weddingDay[0],
        images.hero[1],
        images.galleries.weddingDay[2],
        images.galleries.weddingDay[3],
        images.galleries.weddingDay[4],
      ],
    },
  ],
}
