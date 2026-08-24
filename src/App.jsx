import { useEffect, useState } from 'react'
import { images } from './imageCatalog'
import { ContactSection, Rail, SiteFooter, SiteHeader, SmartImage } from './SiteComponents'
import { sitePath } from './sitePaths'

export function App(){
  const [slide,setSlide]=useState(0)
  useEffect(()=>{const id=setInterval(()=>setSlide(v=>(v+1)%images.hero.length),5500);return()=>clearInterval(id)},[])
  return <main>
    <SiteHeader overlayHero />
    <section className="hero" id="top">
      {images.hero.map((image,i)=><SmartImage key={image.base} className={`hero-picture ${i===slide?'active':''}`} image={image} loading={i===0?'eager':'lazy'} fetchPriority={i===0?'high':'auto'} decoding="async" sizes="100vw" />)}
      <h1>Capture your big day as it unfolds</h1>
      <div className="counter">
        <button onClick={() => setSlide(current => (current - 1 + images.hero.length) % images.hero.length)} aria-label="Previous image">‹</button>
        <span className="counter-value">{slide + 1} / {images.hero.length}</span>
        <button onClick={() => setSlide(current => (current + 1) % images.hero.length)} aria-label="Next image">›</button>
      </div>
    </section>

    <section className="intro content-block"><p className="eyebrow">Singapore wedding photography &amp; videography</p><p>We, at ijós Stories, create natural, documentary style photography and videography for ROMs, church ceremonies, multicultural celebrations, weddings (Singapore and destinations), pre-wedding shoots and proposals.</p><p>From quiet glances to joyful celebrations, we capture the moments that matter while blending seamlessly into your day, so you can be fully present with the people you love.</p></section>

    <section className="about content-block"><SmartImage image={images.people.photographer} loading="lazy" decoding="async" sizes="(max-width: 720px) 100vw, 31rem"/><div><p className="eyebrow">Meet the photographer</p><h2>Hi! I'm Madhu</h2><p>I’m the founder and lead photographer behind ijós Stories.</p><p>I’ve been photographing people and stories since 2013. My approach is simple: help you feel comfortable, blend into the background when the moments matter, and capture your day as naturally as it unfolds.</p></div></section>

    <section className="service left content-block"><div><h2>Wedding Day</h2><p>From intimate solemnisations to multi-day wedding celebrations, we create photos and videos that let you relive the people, emotions and moments that made the day yours.</p><a className="text-link" href={sitePath('/wedding-day')}>View wedding coverage</a></div><Rail images={images.galleries.weddingDay} label="Wedding day gallery"/></section>
    <section className="service right content-block"><Rail images={images.galleries.preWedding} label="Pre-wedding gallery"/><div><h2>Pre-wedding shoots</h2><p>Meaningful pre wedding photography that captures this chapter of your story with honesty, warmth and timeless style.</p><a className="text-link" href={sitePath('/pre-wedding')}>View pre-wedding shoots</a></div></section>
    <section className="service left content-block"><div><h2>Proposal</h2><p>Planning the perfect proposal? We’ll work behind the scenes to ensure every meaningful moment is beautifully and discreetly captured.</p><a className="text-link" href={sitePath('/proposal')}>View proposal photography</a></div><Rail images={images.galleries.proposal} label="Proposal gallery"/></section>

    <section className="testimonial content-block"><div><blockquote>“Madhu was our superstar wedding photographer... She moved around the ceremony, the cocktails at the bar and the dinner, and managed to get the most beautiful, intimate, authentic, fun, lively shots of everybody attending our wedding. Although the lighting in the venue wasn't great, she did her magic and produced professional quality photos... everybody absolutely adored her work.”</blockquote><p>Marianna Pascal</p></div><SmartImage image={images.people.testimonial} loading="lazy" decoding="async"/></section>

    <section className="packages content-block"><SmartImage image={images.sections.packages} loading="lazy" decoding="async"/><div>{[['Full day (10 hrs) Actual Day packages','$ 1800'],['Half day (6 hrs) Actual Day packages','$ 1200'],['Pre-wedding shoot packages','$ 500'],['Proposal packages','$ 300']].map(([n,p])=><div className="price" key={n}><h3>{n}</h3><p>start from {p}</p></div>)}<p className="note">Contact us to get a welcome guide with all package details, FAQs and all other info you will need.</p></div></section>

    <ContactSection />
    <SiteFooter />
  </main>
}
