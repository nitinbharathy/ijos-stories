import { ContactSection, PageSeo, SiteFooter, SiteHeader } from './SiteComponents'

const faqGroups = [
  {
    title: 'Before you book',
    questions: [
      {
        question: 'What kinds of celebrations do you photograph?',
        answer: 'We photograph ROMs, church ceremonies, multicultural and multi-day weddings, destination celebrations, pre-wedding sessions and proposals.',
      },
      {
        question: 'How do we check whether our date is available?',
        answer: 'Send your date, venue and the kind of coverage you are considering through the enquiry form. We will reply with availability and the most relevant package details.',
      },
      {
        question: 'Can we book both photography and videography?',
        answer: 'Yes. Photography and videography can be planned together for wedding-day coverage. Share what you need when you enquire and we will recommend a suitable option.',
      },
      {
        question: 'Do you photograph celebrations outside Singapore?',
        answer: 'Destination celebrations can be considered. Tell us where and when you are planning your celebration so travel requirements can be included in a tailored proposal.',
      },
    ],
  },
  {
    title: 'The experience',
    questions: [
      {
        question: 'What is your photography style?',
        answer: 'Our approach is natural and documentary-led. We pay attention to real interactions and the atmosphere of the day, while offering gentle direction when portraits or group photographs need it.',
      },
      {
        question: 'What if we feel awkward in front of the camera?',
        answer: 'That is completely normal. We keep direction simple and conversational, giving you space to settle in and focus on each other rather than on the camera.',
      },
      {
        question: 'Can you help us plan a surprise proposal?',
        answer: 'Yes. We can work through the location, timing and photographic position with you beforehand, then photograph discreetly until the surprise is complete.',
      },
      {
        question: 'Can we choose the location for a pre-wedding shoot?',
        answer: 'Yes. We can plan around places in Singapore that suit your story and preferred visual style. Share any meaningful locations or ideas when you enquire.',
      },
    ],
  },
  {
    title: 'Packages and delivery',
    questions: [
      {
        question: 'Where can we see the complete package details?',
        answer: 'Submit an enquiry and we will send the welcome guide with the package options and information relevant to the service you are considering.',
      },
      {
        question: 'Can coverage be shaped around our schedule?',
        answer: 'Yes. Your timeline, locations and priorities help determine the most suitable coverage. Include those details in your enquiry and we can advise you before you decide.',
      },
      {
        question: 'How and when will we receive our photographs or films?',
        answer: 'Delivery format and timing depend on the coverage you book. The exact details will be included in your package information and confirmed before booking.',
      },
      {
        question: 'What happens after we send an enquiry?',
        answer: 'We will review your date and plans, confirm availability, and share the relevant welcome guide. You can then ask questions and decide whether the approach and package feel right for you.',
      },
    ],
  },
]

const faqItems = faqGroups.flatMap((group) => group.questions)

export function FaqPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  return <main>
    <PageSeo
      title="Wedding Photography FAQ Singapore | ijós Moments"
      description="Answers about booking, wedding photography and videography, pre-wedding sessions, proposals, packages and the ijós Moments experience."
      path="/faq"
      structuredData={structuredData}
    />
    <SiteHeader />

    <section className="faq-page-heading content-block">
      <p className="eyebrow">A little clarity before we begin</p>
      <h1>Frequently asked questions</h1>
      <p>From planning and booking to what it feels like in front of the camera, here are the answers couples usually look for first.</p>
    </section>

    <div className="faq-page-groups content-block">
      {faqGroups.map((group, groupIndex) => <section className="faq-page-group" key={group.title}>
        <div className="faq-page-group-heading">
          <span aria-hidden="true">0{groupIndex + 1}</span>
          <h2>{group.title}</h2>
        </div>
        <div className="faq-page-list">
          {group.questions.map((item) => <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>)}
        </div>
      </section>)}
    </div>

    <section className="faq-page-cta content-block">
      <p className="eyebrow">Still wondering about something?</p>
      <h2>Tell us what you’re planning</h2>
      <p>Every celebration is different. Share your date, ideas and questions, and we’ll help you find the right coverage.</p>
      <a className="text-link" href="#contact">Ask us a question</a>
    </section>

    <ContactSection />
    <SiteFooter />
  </main>
}
