import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { getImageSources, images } from './imageCatalog'
import { sitePath } from './sitePaths'

export function SmartImage({ image, className, ...props }) {
  const sources = getImageSources(image.base)
  const fallback = sources.jpg || sources.webp || sources.avif
  const { style: imageStyle, ...imageProps } = props
  const pictureClassName = ['smart-image', className].filter(Boolean).join(' ')
  const focusStyle = {
    '--image-focus-desktop': image.focus.desktop,
    '--image-focus-mobile': image.focus.mobile,
  }

  return <picture className={pictureClassName} style={focusStyle}>
    {sources.avif && <source srcSet={sources.avif} type="image/avif" />}
    {sources.webp && <source srcSet={sources.webp} type="image/webp" />}
    <img src={fallback} alt={image.alt} style={{ objectPosition: 'var(--image-focus-current)', ...imageStyle }} {...imageProps} />
  </picture>
}

export function Rail({ images: railImages, label }) {
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const autoplay = useRef(Autoplay({ active: !reduceMotion, delay: 4200, stopOnInteraction: false, stopOnMouseEnter: false, stopOnFocusIn: true }))
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

export function SiteHeader({ overlayHero = false }) {
  const [isFloating, setIsFloating] = useState(false)

  useEffect(() => {
    let frame
    const updateHeader = () => {
      frame = undefined
      setIsFloating(window.scrollY > 24)
    }
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader)
    }

    updateHeader()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const headerClasses = isFloating ? 'is-floating' : undefined
  const shellClasses = ['site-header-shell', overlayHero && 'over-hero', overlayHero && isFloating && 'is-floating-shell'].filter(Boolean).join(' ')

  return <div className={shellClasses}>
    <header className={headerClasses}>
      <a href={sitePath('/')} className="brand">ijós moments</a>
      <a href="#contact" className="header-action">Get in touch</a>
    </header>
  </div>
}

export function ContactSection() {
  const [submissionStatus, setSubmissionStatus] = useState('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)

    if (formData.get('website')) return

    setSubmissionStatus('submitting')
    setSubmissionMessage('Sending your enquiry…')

    const services = formData.getAll('services')
    const email = formData.get('email')?.trim()
    const message = formData.get('message')?.trim()
    const fields = [
      { objectTypeId: '0-1', name: 'firstname', value: formData.get('firstname').trim() },
      { objectTypeId: '0-1', name: 'mobilephone', value: formData.get('mobilephone').trim() },
    ]

    if (email) fields.push({ objectTypeId: '0-1', name: 'email', value: email })
    if (message) fields.push({ objectTypeId: '0-1', name: 'message', value: message })
    if (services.length) {
      fields.push({ objectTypeId: '0-5', name: 'services_require', value: services.join(';') })
    }

    try {
      const response = await fetch('https://api.hsforms.com/submissions/v3/integration/submit/246933680/6f495e54-22cb-4d45-be12-46c2ff135a4d', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields,
          context: {
            pageName: document.title,
            pageUri: window.location.href,
          },
        }),
      })

      if (!response.ok) throw new Error('HubSpot rejected the submission')

      form.reset()
      setSubmissionStatus('success')
      setSubmissionMessage('Thank you — your enquiry has been sent.')
    } catch {
      setSubmissionStatus('error')
      setSubmissionMessage('We could not send your enquiry. Please try again shortly.')
    }
  }

  return <section className="contact content-block" id="contact">
    <SmartImage className="contact-background" image={images.sections.contact} loading="lazy" decoding="async" aria-hidden="true" />
    <div className="contact-copy"><h2>Get in touch</h2><p>Fill the form to get in touch and get the welcome guide with package details and all the info you will need to make a decision.</p></div>
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form-fields">
        <label>
          <span>First name <span aria-hidden="true">*</span></span>
          <input name="firstname" type="text" autoComplete="given-name" required />
        </label>
        <label>
          <span>Phone number <span aria-hidden="true">*</span></span>
          <input name="mobilephone" type="tel" autoComplete="tel" placeholder="+65" required />
        </label>
      </div>

      <fieldset>
        <legend>Services required</legend>
        <div className="contact-form-options">
          <label><input name="services" type="checkbox" value="-wsG-gLF3LTLVe8mNQZpa" /> <span>Actual day wedding coverage</span></label>
          <label><input name="services" type="checkbox" value="U6CZQdYleCNGLy_vcwQeS" /> <span>Pre-wedding shoot</span></label>
          <label><input name="services" type="checkbox" value="p9MGBzM6RquSrG-IKBqpc" /> <span>Proposal coverage</span></label>
          <label><input name="services" type="checkbox" value="lKcGT2daUw11BaH4iGhHs" /> <span>Others</span></label>
        </div>
      </fieldset>

      <label>
        <span>Email</span>
        <input name="email" type="email" autoComplete="email" />
      </label>
      <label>
        <span>Message</span>
        <textarea name="message" rows="4" placeholder="Date, scope of services, details about the celebration, etc" />
      </label>
      <div className="contact-form-honeypot" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex="-1" autoComplete="off" aria-hidden="true" />
      </div>
      <p className={`contact-form-status is-${submissionStatus}`} aria-live="polite">{submissionMessage}</p>
      <button type="submit" disabled={submissionStatus === 'submitting'}>
        {submissionStatus === 'submitting' ? 'Sending…' : 'Submit'}
      </button>
    </form>
  </section>
}

export function SiteFooter() {
  return (
    <footer>
      <div className="footer-invitation">
        <h2>Let’s make something timeless</h2>
      </div>
      <div className="footer-directory">
        <nav aria-label="Footer navigation">
          <div className="footer-primary-links">
            <a href={sitePath('/')}>Home</a>
            <a href={sitePath('/stories')}>Stories</a>
            <a href={sitePath('/faq')}>FAQ</a>
          </div>
          <div className="footer-service-links">
            <a href={sitePath('/wedding-day')}>Wedding Day</a>
            <a href={sitePath('/pre-wedding')}>Pre-wedding</a>
            <a href={sitePath('/proposal')}>Proposal</a>
          </div>
        </nav>
        <div className="footer-social">
          <p>Follow on Instagram</p>
          <a href="https://www.instagram.com/ijos_moments/" target="_blank" rel="noreferrer">@IJOS_MOMENTS</a>
        </div>
      </div>
      <div className="footer-signoff">
        <p className="footer-brand">ijós moments</p>
        <p className="footer-copyright">© 2026 ijos moments</p>
      </div>
    </footer>
  )
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
    canonical.href = new URL(sitePath(path), window.location.origin).href

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
