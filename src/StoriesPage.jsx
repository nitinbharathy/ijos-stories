import { ContactSection, PageSeo, SiteFooter, SiteHeader, SmartImage } from './SiteComponents'
import { stories } from './storyData'
import { sitePath } from './sitePaths'

export function StoriesPage() {
  const [featuredStory, ...moreStories] = stories
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Wedding, Pre-wedding and Proposal Stories',
    description: 'Curated wedding, pre-wedding and proposal photography stories by ijós Stories in Singapore.',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: stories.map((story, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: new URL(sitePath(`/stories/${story.slug}`), window.location.origin).href,
        name: story.title,
      })),
    },
  }

  return <main>
    <PageSeo title="Wedding & Proposal Stories Singapore | ijós Stories" description="Explore real wedding, pre-wedding and proposal photography stories documented by ijós Stories in Singapore." path="/stories" structuredData={structuredData} />
    <SiteHeader />

    <section className="stories-heading content-block">
      <h1>Stories</h1>
      <p>Real moments, artfully told.<br />A journal of weddings, portraits and proposals photographed in Singapore.</p>
    </section>

    <section className="stories-list content-block" aria-label="Photography stories">
      <article className="story-feature">
        <a className="story-feature-media" href={sitePath(`/stories/${featuredStory.slug}`)} aria-label={`View ${featuredStory.title}`}>
          <SmartImage image={featuredStory.heroImage} loading="eager" fetchPriority="high" decoding="async" />
        </a>
        <div className="story-feature-copy"><p className="eyebrow">{featuredStory.category} · {featuredStory.location}</p><h2><a href={sitePath(`/stories/${featuredStory.slug}`)}>{featuredStory.title}</a></h2><p>{featuredStory.excerpt}</p><a className="text-link" href={sitePath(`/stories/${featuredStory.slug}`)}>View story</a></div>
      </article>

      <div className="story-grid">
        {moreStories.map((story) => <article className="story-preview" key={story.slug}>
          <a className="story-preview-media" href={sitePath(`/stories/${story.slug}`)} aria-label={`View ${story.title}`}><SmartImage image={story.heroImage} loading="lazy" decoding="async" /></a>
          <div><p className="eyebrow">{story.category} · {story.location}</p><h2><a href={sitePath(`/stories/${story.slug}`)}>{story.title}</a></h2><p>{story.excerpt}</p><a className="text-link" href={sitePath(`/stories/${story.slug}`)}>View story</a></div>
        </article>)}
      </div>
    </section>

    <section className="stories-service-link content-block"><p className="eyebrow">Planning your celebration?</p><h2>Explore wedding-day coverage</h2><a className="text-link" href={sitePath('/wedding-day')}>Wedding photography &amp; videography</a></section>
    <ContactSection selectedService="Actual day coverage" />
    <SiteFooter />
  </main>
}
