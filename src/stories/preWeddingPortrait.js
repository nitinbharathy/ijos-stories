import { images } from '../imageCatalog'
import { STORY_SLUGS } from '../storyRoutes'

export const preWeddingPortraitStory = {
  slug: STORY_SLUGS.preWeddingPortrait,
  category: 'Pre-wedding',
  tags: ['Couple portraits', 'Black and white', 'Formal portraits', 'Indoor portraits'],
  location: 'Singapore',
  title: 'A Playful Pre-wedding Portrait Story in Singapore',
  excerpt: 'Playful glances, close black-and-white frames and warm interior light give this portrait session its energy.',
  metaTitle: 'Pre-wedding Portrait Story Singapore | ijós Stories',
  metaDescription: 'A Singapore pre-wedding portrait story moving between playful formal portraits, intimate black-and-white frames and warm interior light.',
  heroImage: images.galleries.preWedding[1],
  servicePath: '/pre-wedding',
  serviceLabel: 'View pre-wedding service',
  selectedService: 'Pre-wedding shoots',
  blocks: [
    {
      type: 'introduction',
      paragraphs: ['This portrait story balances light-hearted expressions with closer, quieter frames. The shifts in distance, colour and setting create variety while keeping the couple’s connection at the centre.'],
    },
    {
      type: 'imageText',
      eyebrow: 'A closer frame',
      title: 'Quiet connection in black and white',
      paragraphs: ['Removing colour places the emphasis on expression, gesture and the small distance between the couple. The close crop gives the photograph an intimate, timeless quality.'],
      image: images.galleries.preWedding[0],
    },
    {
      type: 'imageText',
      eyebrow: 'Warm interior light',
      title: 'A more cinematic final portrait',
      paragraphs: ['The final setting introduces warm reflective surfaces and deeper shadows. It changes the pace of the story while keeping the couple relaxed and fully present with each other.'],
      image: images.galleries.preWedding[4],
    },
  ],
}
