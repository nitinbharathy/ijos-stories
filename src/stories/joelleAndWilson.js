import { images } from '../imageCatalog'
import { STORY_SLUGS } from '../storyRoutes'

const storyImages = images.stories.joelleWilson
const photo = (id) => storyImages.find((image) => image.id === id)

export const joelleAndWilsonStory = {
  slug: STORY_SLUGS.joelleAndWilson,
  category: 'Wedding Day',
  tags: ['Chinese wedding', 'Gatecrash', 'Tea ceremony', 'Wedding reception'],
  location: 'Singapore',
  heroLocation: 'Joelle and Wilson',
  title: 'Joelle and Wilson | A Joyful Wedding Celebration in Singapore',
  excerpt: 'A lively gatecrash, meaningful family traditions, sunlit portraits and an evening reception filled with celebration.',
  metaTitle: 'Joelle and Wilson’s Singapore Wedding | ijós Stories',
  metaDescription: 'Joelle and Wilson’s Singapore wedding story, from a lively gatecrash and family traditions to outdoor portraits and their evening reception.',
  heroImage: photo('dsc4293'),
  heroImages: [photo('dsc4293'), photo('dsc3971'), photo('dsc3586')],
  servicePath: '/wedding-day',
  serviceLabel: 'View wedding-day service',
  selectedService: 'Actual day coverage',
  blocks: [
    {
      type: 'introduction',
      paragraphs: ['Joelle and Wilson’s wedding began with a lively gatecrash and family traditions before moving outdoors for portraits and into an evening reception surrounded by friends and family.'],
    },
    {
      type: 'imageText',
      eyebrow: 'The morning',
      title: 'Getting ready and gatecrash games',
      paragraphs: ['The morning balanced quiet preparation with the energy of Wilson and his friends taking on the gatecrash games.'],
      image: photo('dsc3157'),
      imagePosition: 'left',
    },
    {
      type: 'imageText',
      eyebrow: 'Family traditions',
      title: 'Time together at home',
      paragraphs: ['Between the laughter were meaningful family moments that kept the celebration rooted in the people closest to them.'],
      image: photo('dsc3346'),
      imagePosition: 'right',
    },
    {
      type: 'imageText',
      eyebrow: 'Portraits',
      title: 'Soft light and a quieter pace',
      paragraphs: ['Outside, the pace softened as Joelle and Wilson walked together and settled into a series of warm, sunlit portraits.'],
      image: photo('dsc3971'),
      imagePosition: 'left',
    },
    {
      type: 'imageText',
      eyebrow: 'The reception',
      title: 'An entrance surrounded by everyone they love',
      paragraphs: ['Their evening entrance brought the whole story together, with the couple walking hand in hand between cheering guests.'],
      image: photo('dsc4293'),
      imagePosition: 'right',
    },
    {
      type: 'gallery',
      label: 'Joelle and Wilson wedding gallery',
      images: storyImages,
    },
  ],
}
