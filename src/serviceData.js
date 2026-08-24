import { images } from './imageCatalog'

const provider = {
  '@type': 'ProfessionalService',
  name: 'ijós Stories',
  telephone: '+6585354678',
  email: 'photos.ijos@gmail.com',
}

export const services = [
  {
    slug: 'wedding-day',
    navLabel: 'Wedding Day',
    formValue: 'Actual day coverage',
    eyebrow: 'Singapore wedding photography & videography',
    title: 'Wedding Day Photography & Videography',
    metaTitle: 'Wedding Photography & Videography Singapore | ijós Stories',
    metaDescription: 'Natural, documentary-style wedding photography and videography in Singapore for solemnisations, church ceremonies and multicultural celebrations.',
    lead: 'Your wedding is made of more than the planned moments. We document the quiet exchanges, joyful celebrations and people who make the day unmistakably yours.',
    heroImage: images.hero[0],
    gallery: images.galleries.weddingDay,
    storyTitle: 'Present for every part of your day',
    story: [
      'From intimate solemnisations to multi-day celebrations, we photograph the day as it naturally unfolds while helping you feel comfortable whenever a little direction is useful.',
      'Our unobtrusive approach keeps the focus on your experience, giving you honest photographs and films that bring back how the day felt.',
    ],
    packages: [
      { name: 'Full day actual day coverage', detail: '10 hours', price: 'From $1,800' },
      { name: 'Half day actual day coverage', detail: '6 hours', price: 'From $1,200' },
    ],
    faqs: [
      { question: 'What kinds of weddings do you photograph?', answer: 'We cover ROMs, church ceremonies, multicultural celebrations, intimate weddings, multi-day weddings and destination celebrations.' },
      { question: 'Can we book both photography and videography?', answer: 'Yes. Tell us what coverage you need and we will share the relevant options in the welcome guide.' },
      { question: 'How do we check availability?', answer: 'Send your date, venue and estimated coverage hours through the enquiry form. We will reply with availability and the most suitable package details.' },
    ],
  },
  {
    slug: 'pre-wedding',
    navLabel: 'Pre-wedding',
    formValue: 'Pre-wedding shoots',
    eyebrow: 'Pre-wedding photography in Singapore',
    title: 'Pre-wedding Photography',
    metaTitle: 'Pre-wedding Photographer Singapore | ijós Stories',
    metaDescription: 'Warm, natural pre-wedding photography in Singapore, created around your relationship, personalities and the places meaningful to you.',
    lead: 'A pre-wedding session should feel like time spent together, not a performance for the camera. We create relaxed photographs with warmth, movement and a timeless finish.',
    heroImage: images.galleries.preWedding[1],
    gallery: images.galleries.preWedding,
    storyTitle: 'A session that feels like you',
    story: [
      'We shape the shoot around your personalities and the atmosphere you want, from understated city portraits to something playful and spontaneous.',
      'You will receive gentle direction when you need it, with space for the natural gestures and in-between moments that make the images personal.',
    ],
    packages: [
      { name: 'Pre-wedding photography', detail: 'Contact us for the complete package guide', price: 'From $500' },
    ],
    faqs: [
      { question: 'Where can we have our pre-wedding shoot?', answer: 'We can plan around locations in Singapore that suit your story and preferred visual style. Share any meaningful places when you enquire.' },
      { question: 'Will you guide us during the shoot?', answer: 'Yes. We offer simple direction so you feel comfortable while leaving room for natural movement and interaction.' },
      { question: 'How do we receive the full package details?', answer: 'Enquire with your preferred date and ideas, and we will send the welcome guide with package information and FAQs.' },
    ],
  },
  {
    slug: 'proposal',
    navLabel: 'Proposal',
    formValue: 'Proposal shoot',
    eyebrow: 'Proposal photography in Singapore',
    title: 'Proposal Photography',
    metaTitle: 'Proposal Photographer Singapore | ijós Stories',
    metaDescription: 'Discreet proposal photography in Singapore, planned with you so the surprise and every meaningful reaction are naturally captured.',
    lead: 'You plan the question; we make sure the surprise, reaction and celebration are documented without taking you out of the moment.',
    heroImage: images.galleries.proposal[0],
    gallery: images.galleries.proposal,
    storyTitle: 'Carefully planned, quietly captured',
    story: [
      'We work behind the scenes with you before the proposal so the timing, position and key details are clear while keeping the experience discreet.',
      'Once the question has been asked, we can capture the excitement and a few relaxed portraits of you together.',
    ],
    packages: [
      { name: 'Proposal photography', detail: 'Contact us to plan your proposal', price: 'From $300' },
    ],
    faqs: [
      { question: 'How do you photograph the proposal discreetly?', answer: 'We agree on the location, timing and positioning with you beforehand, then photograph from a discreet vantage point until the surprise is complete.' },
      { question: 'Can you help plan the photography timing?', answer: 'Yes. Share your idea and location, and we will help you think through the timing and photographic setup.' },
      { question: 'Can we take portraits after the proposal?', answer: 'Yes. After the surprise, we can capture the celebration and relaxed portraits of you together.' },
    ],
  },
]

services.forEach((service) => {
  if (!service.heroImage) {
    console.error(`Service "${service.slug}" needs a valid hero image`)
  }
  if (!Array.isArray(service.gallery) || !service.gallery.length) {
    console.error(`Service "${service.slug}" needs at least one gallery image`)
  }
})

export function getService(slug) {
  return services.find((service) => service.slug === slug)
}

export function getServiceStructuredData(service, origin) {
  const pageUrl = `${origin}/${service.slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${pageUrl}#service`,
        name: service.title,
        description: service.metaDescription,
        url: pageUrl,
        areaServed: { '@type': 'Country', name: 'Singapore' },
        provider,
        offers: service.packages.map((item) => ({
          '@type': 'Offer',
          priceCurrency: 'SGD',
          price: item.price.replace(/[^0-9]/g, ''),
          description: `${item.name} — ${item.detail}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
    ],
  }
}
