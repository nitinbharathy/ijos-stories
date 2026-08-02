import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { getImageSources, images } from './imageCatalog'

export function SmartImage({ image, className, ...props }) {
  const sources = getImageSources(image.base)
  const fallback = sources.jpg || sources.webp || sources.avif

  return <picture className={className}>
    {sources.avif && <source srcSet={sources.avif} type="image/avif" />}
    {sources.webp && <source srcSet={sources.webp} type="image/webp" />}
    <img src={fallback} alt={image.alt} {...props} />
  </picture>
}

export function Rail({ images: railImages, label }) {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const autoplay = useRef(Autoplay({ active: !reduceMotion, delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }))
  const [railRef, railApi] = useEmblaCarousel({ loop: true, align: 'start', duration: 32 }, [autoplay.current])
  const move = (direction) => {
    if (direction === 'previous') railApi?.scrollPrev()
    else railApi?.scrollNext()
    autoplay.current.reset()
  }

  return <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
    <div className="rail" ref={railRef}>
      <div className="rail-track">{railImages.map((image, index) => <div className="rail-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${railImages.length}`} key={image.base}><SmartImage image={image} loading="lazy" decoding="async" /></div>)}</div>
    </div>
    <div className="rail-controls">
      <button type="button" onClick={() => move('previous')} aria-label={`Previous image in ${label}`}>‹</button>
      <button type="button" onClick={() => move('next')} aria-label={`Next image in ${label}`}>›</button>
    </div>
  </div>
}

export function SiteHeader({ showHomeLink = false }) {
  return <header>
    {showHomeLink && <a href="/" className="header-back">Home</a>}
    <a href="/" className="brand">ijós moments</a>
    <a href="#contact" className="header-action">Get in touch</a>
  </header>
}

export function ContactSection({ selectedService = '' }) {
  const [formSent, setFormSent] = useState(false)

  return <section className="contact content-block" id="contact">
    <SmartImage className="contact-background" image={images.sections.contact} loading="lazy" decoding="async" aria-hidden="true" />
    <div><h2>Get in touch</h2><p>Fill the form to get in touch and get the welcome guide with package details and all the info you will need to make a decision.</p><p>Ph: +65 8535 4678<br />Email: photos.ijos@gmail.com</p></div>
    <form onSubmit={(event) => { event.preventDefault(); setFormSent(true) }}>
      <label>Name *<input placeholder="John Doe" required /></label>
      <label>Email address *<input type="email" placeholder="Your email address" required /></label>
      <label>Mobile number *<input placeholder="Your WhatsApp number" required /></label>
      <label>Service required *<select required defaultValue={selectedService}><option value="" disabled>Select option</option><option value="Actual day coverage">Actual day coverage</option><option value="Pre-wedding shoots">Pre-wedding shoots</option><option value="Proposal shoot">Proposal shoot</option></select></label>
      <label>Date of the event *<input type="date" required /></label>
      <label>Message *<textarea placeholder="Any other details you would like to share" required /></label>
      <button type="submit">Send message</button>
      {formSent && <p className="form-success" role="status" aria-live="polite">Thank you — your message has been received. We’ll be in touch soon.</p>}
    </form>
  </section>
}

export function SiteFooter() {
  return <footer><p>Follow me on Instagram</p><a href="https://www.instagram.com/ijos_moments/">@IJOS_MOMENTS</a><p>© 2026 ijos</p></footer>
}

export function PageSeo({ title, description, path, structuredData }) {
  useEffect(() => {
    document.title = title

    const descriptionTag = document.querySelector('meta[name="description"]')
    descriptionTag?.setAttribute('content', description)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.append(canonical)
    }
    canonical.href = new URL(path, window.location.origin).href

    let structuredDataTag = document.querySelector('#page-structured-data')
    if (!structuredDataTag) {
      structuredDataTag = document.createElement('script')
      structuredDataTag.id = 'page-structured-data'
      structuredDataTag.type = 'application/ld+json'
      document.head.append(structuredDataTag)
    }
    structuredDataTag.textContent = JSON.stringify(structuredData)
  }, [description, path, structuredData, title])

  return null
}
