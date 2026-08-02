import { ContactSection, PageSeo, SiteFooter, SiteHeader, SmartImage } from './SiteComponents'
import { getStoryStructuredData } from './storyData'

export function StoryPage({ story }) {
  const structuredData = getStoryStructuredData(story, window.location.origin)

  return <main>
    <PageSeo title={story.metaTitle} description={story.metaDescription} path={`/stories/${story.slug}`} structuredData={structuredData} />
    <SiteHeader showHomeLink />

    <article>
      <section className="story-hero">
        <SmartImage image={story.heroImage} loading="eager" fetchPriority="high" decoding="async" />
        <div><p className="eyebrow">{story.category} · {story.location}</p><h1>{story.title}</h1></div>
      </section>

      <section className="story-introduction content-block"><p>{story.introduction}</p></section>

      <div className="story-sections">
        {story.sections.map((section, index) => <section className={`story-section content-block ${index % 2 ? 'reverse' : ''}`} key={section.title}>
          <SmartImage image={section.image} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
          <div><p className="eyebrow">{section.eyebrow}</p><h2>{section.title}</h2><p>{section.body}</p></div>
        </section>)}
      </div>
    </article>

    <section className="story-close content-block"><p className="eyebrow">Your story</p><h2>Photography that leaves room for the day itself</h2><p>Explore the approach and coverage options for wedding celebrations in Singapore and beyond.</p><a className="text-link" href="/wedding-day">View wedding-day service</a><a className="text-link" href="/stories">All stories</a></section>
    <ContactSection selectedService="Actual day coverage" />
    <SiteFooter />
  </main>
}
