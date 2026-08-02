import { ContactSection, PageSeo, SiteFooter, SiteHeader, SmartImage } from './SiteComponents'
import { stories } from './storyData'

export function StoriesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Wedding, Pre-wedding and Proposal Stories',
    description: 'Curated wedding, pre-wedding and proposal photography stories by ijós Moments in Singapore.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: stories.map((story, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${window.location.origin}/stories/${story.slug}`,
        name: story.title,
      })),
    },
  }

  return <main>
    <PageSeo title="Wedding & Proposal Stories Singapore | ijós Moments" description="Explore real wedding, pre-wedding and proposal photography stories documented by ijós Moments in Singapore." path="/stories" structuredData={structuredData} />
    <SiteHeader showHomeLink />

    <section className="stories-heading content-block">
      <p className="eyebrow">Stories</p>
      <h1>Real celebrations, thoughtfully documented</h1>
      <p>Curated wedding and proposal stories told through photographs, atmosphere and the small details that made each celebration distinct.</p>
    </section>

    <section className="stories-list content-block" aria-label="Photography stories">
      {stories.map((story) => <article className="story-card" key={story.slug}>
        <a href={`/stories/${story.slug}`} aria-label={`View ${story.title}`}><SmartImage image={story.heroImage} loading="eager" fetchPriority="high" decoding="async" /></a>
        <div><p className="eyebrow">{story.category} · {story.location}</p><h2><a href={`/stories/${story.slug}`}>{story.title}</a></h2><p>{story.excerpt}</p><a className="text-link" href={`/stories/${story.slug}`}>View story</a></div>
      </article>)}
    </section>

    <section className="stories-service-link content-block"><p className="eyebrow">Planning your celebration?</p><h2>Explore wedding-day coverage</h2><a className="text-link" href="/wedding-day">Wedding photography &amp; videography</a></section>
    <ContactSection selectedService="Actual day coverage" />
    <SiteFooter />
  </main>
}
