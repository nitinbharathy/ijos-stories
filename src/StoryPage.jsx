import { useEffect, useRef, useState } from 'react'
import { ContactSection, PageSeo, SiteFooter, SiteHeader, SmartImage } from './SiteComponents'
import { getStoryStructuredData } from './storyData'
import { sitePath } from './sitePaths'

function StoryGallery({ gallery, title }) {
  const [activeIndex, setActiveIndex] = useState(null)
  const openerRef = useRef(null)

  const open = (index, event) => {
    openerRef.current = event.currentTarget
    setActiveIndex(index)
  }

  const close = () => {
    setActiveIndex(null)
    window.requestAnimationFrame(() => openerRef.current?.focus())
  }

  const move = (direction) => {
    setActiveIndex((index) => (index + direction + gallery.length) % gallery.length)
  }

  useEffect(() => {
    if (activeIndex === null) return undefined

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') close()
      if (event.key === 'ArrowLeft') move(-1)
      if (event.key === 'ArrowRight') move(1)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeIndex, gallery.length])

  return <>
    <section className="story-gallery content-block" aria-label={`${title} gallery`}>
      <div className="story-gallery-grid">{gallery.map((image, index) => <button className={`story-gallery-item${image.orientation === 'landscape' ? ' is-landscape' : ''}`} type="button" onClick={(event) => open(index, event)} aria-label={`Open image ${index + 1} of ${gallery.length}: ${image.alt}`} aria-haspopup="dialog" key={image.base}><SmartImage image={image} loading="lazy" decoding="async" /></button>)}</div>
    </section>

    {activeIndex !== null && <div className="story-lightbox" role="dialog" aria-modal="true" aria-label={`${title} image viewer`} onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <button className="story-lightbox-close" type="button" onClick={close} aria-label="Close image viewer" autoFocus>×</button>
      <button className="story-lightbox-arrow previous" type="button" onClick={() => move(-1)} aria-label="Previous image">‹</button>
      <div className="story-lightbox-image">
        <SmartImage image={gallery[activeIndex]} decoding="async" />
        <p aria-live="polite">{activeIndex + 1} / {gallery.length}</p>
      </div>
      <button className="story-lightbox-arrow next" type="button" onClick={() => move(1)} aria-label="Next image">›</button>
    </div>}
  </>
}

function StoryParagraphs({ paragraphs }) {
  return paragraphs.map((paragraph, index) => {
    const text = typeof paragraph === 'string' ? paragraph : paragraph.text
    const label = typeof paragraph === 'string' ? null : paragraph.label
    return <p key={`${label || text}-${index}`}>{label && <strong>{label} </strong>}{text}</p>
  })
}

function StoryBlocks({ blocks = [], title }) {
  let imageTextIndex = 0

  return <div className="story-blocks">
    {blocks.map((block, index) => {
      const key = block.id || `${block.type}-${index}`

      if (block.type === 'introduction') {
        return <section className="story-introduction content-block" key={key}><StoryParagraphs paragraphs={block.paragraphs} /></section>
      }

      if (block.type === 'imageText') {
        const imageOnRight = block.imagePosition === 'right' || (!block.imagePosition && imageTextIndex % 2 === 1)
        imageTextIndex += 1
        return <section className={`story-section content-block${imageOnRight ? ' reverse' : ''}`} key={key}>
          <SmartImage image={block.image} loading={imageTextIndex === 1 ? 'eager' : 'lazy'} decoding="async" />
          <div>{block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}{block.title && <h2>{block.title}</h2>}<StoryParagraphs paragraphs={block.paragraphs} /></div>
        </section>
      }

      if (block.type === 'text') {
        return <section className="story-text-block content-block" key={key}>
          {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
          {block.title && <h2>{block.title}</h2>}
          <StoryParagraphs paragraphs={block.paragraphs} />
        </section>
      }

      if (block.type === 'fullImage') {
        return <figure className="story-full-image content-block" key={key}>
          <SmartImage image={block.image} loading="lazy" decoding="async" />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      }

      if (block.type === 'quote') {
        return <figure className="story-quote content-block" key={key}>
          <blockquote>{block.quote}</blockquote>
          {block.attribution && <figcaption>{block.attribution}</figcaption>}
        </figure>
      }

      if (block.type === 'gallery') {
        return <StoryGallery gallery={block.images} title={block.label || title} key={key} />
      }

      return null
    })}
  </div>
}

function StoryClosing({ story }) {
  if (story.closing === false) return null

  const closing = {
    eyebrow: 'Your story',
    title: 'Photography that leaves room for the moment itself',
    text: 'Explore the approach and coverage options for celebrations and portraits in Singapore.',
    ...story.closing,
  }

  return <section className="story-close content-block">
    {closing.eyebrow && <p className="eyebrow">{closing.eyebrow}</p>}
    {closing.title && <h2>{closing.title}</h2>}
    {closing.text && <p>{closing.text}</p>}
    {story.servicePath && <a className="text-link" href={sitePath(story.servicePath)}>{story.serviceLabel || 'View service'}</a>}
    <a className="text-link" href={sitePath('/stories')}>All stories</a>
  </section>
}

export function StoryPage({ story }) {
  const siteOrigin = new URL(sitePath('/'), window.location.origin).href.replace(/\/$/, '')
  const structuredData = getStoryStructuredData(story, siteOrigin)

  return <main>
    <PageSeo title={story.metaTitle} description={story.metaDescription} path={`/stories/${story.slug}`} structuredData={structuredData} />
    <SiteHeader overlayHero />

    <article>
      <section className="story-hero">
        <SmartImage image={story.heroImage} loading="eager" fetchPriority="high" decoding="async" />
        <div><p className="eyebrow">{story.category} · {story.heroLocation || story.location}</p><h1>{story.title}</h1></div>
      </section>

      <StoryBlocks blocks={story.blocks} title={story.title} />
    </article>

    <StoryClosing story={story} />
    {story.showContact !== false && <ContactSection selectedService={story.selectedService} />}
    <SiteFooter />
  </main>
}
