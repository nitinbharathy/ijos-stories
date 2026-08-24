import { ContactSection, PageSeo, SiteFooter, SiteHeader, SmartImage, useProgressiveImageBatch } from './SiteComponents'
import { getServiceStructuredData, services } from './serviceData'
import { sitePath } from './sitePaths'

export function ServicePage({ service }) {
  const siteOrigin = new URL(sitePath('/'), window.location.origin).href.replace(/\/$/, '')
  const structuredData = getServiceStructuredData(service, siteOrigin)
  const { visibleImages, idleImages, loadMoreRef, hasMore } = useProgressiveImageBatch(service.gallery)

  return <main>
    <PageSeo title={service.metaTitle} description={service.metaDescription} path={`/${service.slug}`} structuredData={structuredData} />
    <SiteHeader overlayHero />

    <section className="service-page-hero">
      <SmartImage image={service.heroImage} loading="eager" fetchPriority="high" decoding="async" />
      <div><p className="eyebrow">{service.eyebrow}</p><h1>{service.title}</h1></div>
    </section>

    <section className="service-page-intro content-block"><p>{service.lead}</p><a href="#service-enquiry" className="text-link">Check availability</a></section>

    <section className="service-story content-block">
      <div><p className="eyebrow">The experience</p><h2>{service.storyTitle}</h2></div>
      <div>{service.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
    </section>

    <section className="service-gallery content-block" aria-labelledby="gallery-title">
      <div className="section-heading"><p className="eyebrow">Selected moments</p><h2 id="gallery-title">A glimpse into the story</h2></div>
      <div className="gallery-grid">{visibleImages.map((image) => <SmartImage image={image} loading="lazy" decoding="async" key={image.base} />)}</div>
      {hasMore && <div className="image-grid-load-sentinel" ref={loadMoreRef} aria-hidden="true" />}
      {idleImages.length > 0 && <div className="image-grid-idle-prefetch" aria-hidden="true">
        {idleImages.map((image) => <SmartImage image={image} loading="eager" decoding="async" key={image.base} />)}
      </div>}
    </section>

    <section className="service-page-packages content-block">
      <div><p className="eyebrow">Packages</p><h2>Coverage shaped around your plans</h2><p>Contact us for the welcome guide with the complete package details, FAQs and information you need to decide.</p></div>
      <div>{service.packages.map((item) => <article className="service-package" key={item.name}><div><h3>{item.name}</h3><p>{item.detail}</p></div><strong>{item.price}</strong></article>)}</div>
    </section>

    <section className="faq content-block">
      <div className="section-heading"><p className="eyebrow">Frequently asked questions</p><h2>What couples usually ask</h2></div>
      <div>{service.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
    </section>

    <section className="other-services content-block">
      <p className="eyebrow">Explore other services</p>
      <div>{services.filter((item) => item.slug !== service.slug).map((item) => <a href={sitePath(`/${item.slug}`)} key={item.slug}><SmartImage image={item.heroImage} loading="lazy" decoding="async" /><span>{item.navLabel}</span></a>)}</div>
    </section>

    <div id="service-enquiry"><ContactSection /></div>
    <SiteFooter />
  </main>
}
