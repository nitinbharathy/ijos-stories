import { useEffect, useRef, useState } from 'react'
import { getImageSources, images } from './imageCatalog'
import { resolveImagePresentation } from './imagePresentation'
import { sitePath } from './sitePaths'

const INITIAL_GALLERY_IMAGES = 18
const GALLERY_BATCH_SIZE = 18
const IDLE_PREFETCH_COUNT = 4

function connectionAllowsIdlePrefetch() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  if (!connection) return true
  return !connection.saveData && !['slow-2g', '2g'].includes(connection.effectiveType)
}

export function useProgressiveImageBatch(imageList, options = {}) {
  const safeImageList = Array.isArray(imageList) ? imageList.filter(Boolean) : []
  const imageCount = safeImageList.length
  const initialCount = options.initialCount || INITIAL_GALLERY_IMAGES
  const batchSize = options.batchSize || GALLERY_BATCH_SIZE
  const idleCount = options.idleCount || IDLE_PREFETCH_COUNT
  const [visibleCount, setVisibleCount] = useState(() => Math.min(initialCount, imageCount))
  const [idlePrefetchEnd, setIdlePrefetchEnd] = useState(visibleCount)
  const loadMoreRef = useRef(null)

  useEffect(() => {
    setVisibleCount(Math.min(initialCount, imageCount))
    setIdlePrefetchEnd(Math.min(initialCount, imageCount))
  }, [imageList, initialCount])

  useEffect(() => {
    const sentinel = loadMoreRef.current
    if (!sentinel || visibleCount >= imageCount) return undefined

    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      setVisibleCount((count) => Math.min(count + batchSize, imageCount))
    }, { rootMargin: '1200px 0px' })

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [batchSize, imageCount, visibleCount])

  useEffect(() => {
    setIdlePrefetchEnd(visibleCount)
    if (visibleCount >= imageCount || !connectionAllowsIdlePrefetch()) return undefined

    const warmNextBatch = () => {
      setIdlePrefetchEnd(Math.min(visibleCount + idleCount, imageCount))
    }

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(warmNextBatch, { timeout: 2000 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = window.setTimeout(warmNextBatch, 1200)
    return () => window.clearTimeout(timeoutId)
  }, [idleCount, imageCount, visibleCount])

  return {
    visibleImages: safeImageList.slice(0, visibleCount),
    idleImages: safeImageList.slice(visibleCount, idlePrefetchEnd),
    loadMoreRef,
    hasMore: visibleCount < imageCount,
  }
}

export function SmartImage({ image, className, ...props }) {
  const sources = getImageSources(image?.base)
  const presentation = resolveImagePresentation(image, sources)
  const [loadMode, setLoadMode] = useState('auto')
  const { style: imageStyle, onError, sizes, ...imageProps } = props
  const pictureClassName = ['smart-image', className].filter(Boolean).join(' ')
  const focusStyle = {
    '--image-focus-desktop': presentation.focus.desktop,
    '--image-focus-mobile': presentation.focus.mobile,
  }

  useEffect(() => {
    setLoadMode('auto')
  }, [image?.base])

  useEffect(() => {
    if (presentation.available) return
    console.error(`Image unavailable: ${image?.base || 'missing catalogue entry'}`)
  }, [image?.base, presentation.available])

  if (!presentation.available || loadMode === 'failed') {
    return <span
      className={`${pictureClassName} smart-image-fallback`}
      style={focusStyle}
      role={presentation.alt ? 'img' : undefined}
      aria-label={presentation.alt || undefined}
      aria-hidden={presentation.alt ? undefined : 'true'}
      data-image-state="unavailable"
    />
  }

  const handleError = (event) => {
    onError?.(event)
    setLoadMode((mode) => mode === 'auto' && sources.jpg ? 'jpeg' : 'failed')
  }

  const responsiveSrcSet = (format) => {
    const entries = Object.entries(sources.responsive?.[format] || {})
      .sort(([first], [second]) => Number(first) - Number(second))
    return entries.length ? entries.map(([width, url]) => `${url} ${width}w`).join(', ') : undefined
  }

  return <picture className={pictureClassName} style={focusStyle}>
    {loadMode === 'auto' && sources.avif && <source srcSet={responsiveSrcSet('avif') || sources.avif} sizes={sizes} type="image/avif" />}
    {loadMode === 'auto' && sources.webp && <source srcSet={responsiveSrcSet('webp') || sources.webp} sizes={sizes} type="image/webp" />}
    <img src={loadMode === 'jpeg' ? sources.jpg : presentation.fallback} srcSet={loadMode === 'jpeg' ? responsiveSrcSet('jpg') : undefined} sizes={sizes} alt={presentation.alt} style={{ objectPosition: 'var(--image-focus-current)', ...imageStyle }} onError={handleError} {...imageProps} />
  </picture>
}

export function Rail({ images: railImages, label }) {
  const safeRailImages = Array.isArray(railImages) ? railImages.filter(Boolean) : []
  const railRef = useRef(null)
  const currentIndex = useRef(0)
  const move = (direction) => {
    if (!railRef.current || !safeRailImages.length) return
    currentIndex.current = direction === 'previous'
      ? (currentIndex.current - 1 + safeRailImages.length) % safeRailImages.length
      : (currentIndex.current + 1) % safeRailImages.length
    railRef.current.children[0]?.children[currentIndex.current]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' })
  }

  return <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
    <div className="rail" ref={railRef}>
      <div className="rail-track">{safeRailImages.map((image, index) => <div className="rail-slide" role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${safeRailImages.length}`} key={image.base}><SmartImage image={image} loading="lazy" decoding="async" sizes="(max-width: 720px) 74vw, 25vw" /></div>)}</div>
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
      <a href={sitePath('/')} className="brand">ijós Stories</a>
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
        <p className="footer-brand">ijós Stories</p>
        <p className="footer-copyright">© 2026 ijós Stories</p>
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
