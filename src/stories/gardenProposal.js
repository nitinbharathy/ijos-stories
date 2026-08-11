import { images } from '../imageCatalog'
import { STORY_SLUGS } from '../storyRoutes'

export const gardenProposalStory = {
  slug: STORY_SLUGS.gardenProposal,
  category: 'Proposal',
  tags: ['Garden proposal', 'Surprise proposal', 'Fairy lights', 'Evening photography'],
  location: 'Singapore',
  title: 'A Garden Proposal Under Fairy Lights',
  excerpt: 'A glowing garden setting, an intimate ring detail and an unguarded celebration shape this evening proposal story.',
  metaTitle: 'Garden Proposal Photography Singapore | ijós Stories',
  metaDescription: 'An evening garden proposal story in Singapore, photographed among warm fairy lights with natural reactions and close details.',
  heroImage: images.galleries.proposal[3],
  servicePath: '/proposal',
  serviceLabel: 'View proposal service',
  selectedService: 'Proposal shoot',
  blocks: [
    {
      type: 'introduction',
      paragraphs: ['This proposal story moves from the first celebration into the quieter details that followed. Warm fairy lights connect the photographs and preserve the atmosphere of the evening.'],
    },
    {
      type: 'imageText',
      eyebrow: 'The detail',
      title: 'A quiet frame for the new ring',
      paragraphs: ['A close photograph of joined hands records the ring without losing the warmth and softness of the surrounding lights. It becomes a small pause within the wider celebration.'],
      image: images.galleries.proposal[0],
    },
    {
      type: 'imageText',
      eyebrow: 'After the yes',
      title: 'A moment together beneath the lights',
      paragraphs: ['Once the surprise has settled, the photographs become quieter and more observational. The lights form a warm backdrop while the couple settles into the moment together.'],
      image: images.galleries.proposal[1],
    },
  ],
}
