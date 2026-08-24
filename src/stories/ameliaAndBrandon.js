import { images } from '../imageCatalog'
import { STORY_SLUGS } from '../storyRoutes'

const storyImages = images.stories.ameliaBrandon
const photo = (id) => storyImages.find((image) => image.id === id)

export const ameliaAndBrandonStory = {
  slug: STORY_SLUGS.ameliaAndBrandon,
  category: 'Wedding Day',
  tags: ['Church wedding', 'Intimate wedding', 'Garden portraits', 'Singapore wedding'],
  location: 'Singapore',
  heroLocation: 'Amelia and Brandon',
  title: 'Amelia and Brandon | A Church Wedding and Garden Portraits in Singapore',
  excerpt: 'A joyful church ceremony, meaningful family traditions and quiet portraits surrounded by tropical greenery.',
  metaTitle: 'Amelia and Brandon’s Church Wedding | ijós Stories',
  metaDescription: 'Amelia and Brandon’s intimate Singapore church wedding, followed by family celebrations and tropical garden portraits.',
  heroImage: photo('dsc8674'),
  heroImages: [photo('dsc8674'), photo('dsc7759'), photo('dsc8878')],
  servicePath: '/wedding-day',
  serviceLabel: 'View wedding-day service',
  selectedService: 'Actual day coverage',
  blocks: [
    {
      type: 'introduction',
      paragraphs: ['Amelia and Brandon’s day moved from the anticipation of getting ready into a joyful church ceremony, family traditions and a quiet portrait session surrounded by tropical greenery.'],
    },
    {
      type: 'imageText',
      eyebrow: 'The morning',
      title: 'Getting ready with family close by',
      paragraphs: ['The story begins at home with the small gestures and shared laughter that settle the nerves before the ceremony.'],
      image: photo('dsc6911'),
      imagePosition: 'left',
    },
    {
      type: 'imageText',
      eyebrow: 'The ceremony',
      title: 'A joyful church wedding',
      paragraphs: ['Inside the church, colour from the windows and the warmth of their guests framed a ceremony full of easy smiles and quiet connection.'],
      image: photo('dsc7759'),
      imagePosition: 'right',
    },
    {
      type: 'imageText',
      eyebrow: 'Afterwards',
      title: 'A little room to breathe',
      paragraphs: ['The garden portraits slowed the pace and gave Amelia and Brandon a few moments together among the tropical landscape.'],
      image: photo('dsc8674'),
      imagePosition: 'left',
    },
    {
      type: 'gallery',
      label: 'Amelia and Brandon wedding gallery',
      images: storyImages,
    },
  ],
}
