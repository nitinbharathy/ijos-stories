import { images } from '../imageCatalog'
import { STORY_SLUGS } from '../storyRoutes'

export const pawanAndJaspreetStory = {
  slug: STORY_SLUGS.pawanAndJaspreet,
  category: 'Wedding Day',
  tags: ['Sikh wedding', 'Multi-day wedding', 'Cultural wedding', 'Wedding reception'],
  location: 'Singapore',
  heroLocation: 'Pawan & Jaspreet',
  title: 'A 4-day Sikh Wedding in Singapore',
  excerpt: 'Four days of ceremonies, family traditions, heartfelt celebrations and the enduring love between Pawan and Jaspreet.',
  metaTitle: 'A 4-day Sikh Wedding in Singapore | ijós Stories',
  metaDescription: 'Pawan and Jaspreet’s four-day Sikh wedding celebration in Singapore, from Maiyyan and Mehendi to their Central Gurdwara ceremony and Orchard Hotel reception.',
  heroImage: images.galleries.weddingDay[1],
  heroImages: [
    images.galleries.weddingDay[1],
    images.hero[1],
    images.galleries.weddingDay[5],
  ],
  servicePath: '/wedding-day',
  serviceLabel: 'View wedding-day service',
  selectedService: 'Actual day coverage',
  blocks: [
    {
      type: 'introduction',
      paragraphs: [
        'Pawan and Jaspreet’s wedding was a four-day celebration, but throughout it all, one thing stood out: the love their families had for them, and the love they had for each other.',
        'Their story is a reminder that sometimes, no matter how complicated the journey, fate always brings two destined people to each other.',
      ],
    },
    {
      type: 'imageText',
      eyebrow: 'Day 1',
      title: 'Maiyyan, Mehendi & family',
      paragraphs: ['Day 1 began at Jaspreet’s home with the Maiyyan ceremony, followed by Mehendi and an afternoon of celebrations with family.'],
      image: images.galleries.weddingDay[0],
      imagePosition: 'left',
    },
    {
      type: 'imageText',
      eyebrow: 'Day 2',
      title: 'A night of Bhangra & dancing',
      paragraphs: ['Day 2 was Sangeeth, and the groom’s side kicked things off with an outstanding Bhangra performance. The families followed with performances of their own, before the night inevitably turned into one big dance floor.'],
      image: images.galleries.weddingDay[4],
      imagePosition: 'right',
    },
    {
      type: 'imageText',
      eyebrow: 'Day 3',
      title: 'A ceremony, then familiar places',
      paragraphs: [
        'Day 3 brought everyone to the Central Gurdwara for Pawan and Jaspreet’s wedding ceremony. Later, the celebrations continued at the groom’s home with intimate games and family traditions.',
        'We then headed out for their post-wedding portraits, starting at the National Gallery before visiting places that were part of their everyday life: the jogging path where they ran together every day, and the traffic signal where they said goodbye to each other every night.',
        'Places that might seem ordinary to anyone else, but meant something to them.',
      ],
      image: images.galleries.weddingDay[2],
      imagePosition: 'left',
    },
    {
      type: 'imageText',
      eyebrow: 'Day 4',
      title: 'One final celebration',
      paragraphs: [
        'Day 4 brought everyone together again for the reception at the Orchard Hotel. There were heartfelt speeches, plenty of games, lots of laughter and, of course, another night of dancing.',
        'Four days, countless celebrations, and a whole lot of love. At the heart of it all was simply Pawan and Jaspreet, and the people who were there to celebrate their story with them.',
      ],
      image: images.galleries.weddingDay[3],
      imagePosition: 'right',
    },
    {
      type: 'gallery',
      label: 'Pawan and Jaspreet wedding gallery',
      images: [
        images.galleries.weddingDay[0],
        images.hero[1],
        ...images.galleries.weddingDay.slice(2),
      ],
    },
  ],
}
