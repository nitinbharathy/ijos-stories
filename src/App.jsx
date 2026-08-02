import { useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

const A='/assets/source/'
const hero=['hero-1.jpg','hero-2.jpg','hero-3.jpg']
const wedding=['ab4ebd838cd1db33.JPG','ba9a3e2f96ad5c8c.jpg','727391f1aa20dd45.JPG','bc25697bdf66f61c.jpg','2785d8641b086a24.JPG','5c4f8d801e3e00ed.jpg']
const pre=['42886b1aa866b96a.JPG','693830d48910e2fd.JPG','b1cebf7834e529a9.JPG','1613e58d247f1b35.JPG','01135afb5af48a78.JPG']
const proposal=['f4f9fe09d912feb2.JPG','fb539a4897697cbe.jpg','38bf2569f5e1fc40.JPG','0dc677146fef6372.JPG']

function Rail({images,label}){
  const reduceMotion=typeof window!=='undefined'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const autoplay=useRef(Autoplay({active:!reduceMotion,delay:4200,stopOnInteraction:false,stopOnMouseEnter:true,stopOnFocusIn:true}))
  const [railRef,railApi]=useEmblaCarousel({loop:true,align:'start',duration:32},[autoplay.current])
  const move=(direction)=>{
    if(direction==='previous') railApi?.scrollPrev()
    else railApi?.scrollNext()
    autoplay.current.reset()
  }

  return <div className="carousel" role="region" aria-roledescription="carousel" aria-label={label}>
    <div className="rail" ref={railRef}>
      <div className="rail-track">{images.map((src,i)=><div className="rail-slide" role="group" aria-roledescription="slide" aria-label={`${i+1} of ${images.length}`} key={src}><img src={A+src} alt={`${label} ${i+1}`} loading="lazy" /></div>)}</div>
    </div>
    <div className="rail-controls">
      <button type="button" onClick={()=>move('previous')} aria-label={`Previous image in ${label}`}>‹</button>
      <button type="button" onClick={()=>move('next')} aria-label={`Next image in ${label}`}>›</button>
    </div>
  </div>
}

export function App(){
  const [slide,setSlide]=useState(0)
  const [formSent,setFormSent]=useState(false)
  useEffect(()=>{const id=setInterval(()=>setSlide(v=>(v+1)%hero.length),5500);return()=>clearInterval(id)},[])
  return <main>
    <header><a href="#top" className="brand">ijós moments</a><a href="#contact" className="header-action">Get in touch</a></header>
    <section className="hero" id="top">
      {hero.map((src,i)=><img key={src} className={i===slide?'active':''} src={A+src} alt="Wedding celebration" />)}
      <h1>Capture your big day as it unfolds</h1>
      <div className="counter"><button onClick={()=>setSlide((slide+2)%3)} aria-label="Previous image">‹</button>{slide+1} / 3<button onClick={()=>setSlide((slide+1)%3)} aria-label="Next image">›</button></div>
    </section>

    <section className="intro content-block"><p className="eyebrow">Singapore wedding photography &amp; videography</p><p>We, at ijós Moments, create natural, documentary style photography and videography for ROMs, church ceremonies, multicultural celebrations, weddings (Singapore and destinations), pre-wedding shoots and proposals.</p><p>From quiet glances to joyful celebrations, we capture the moments that matter while blending seamlessly into your day, so you can be fully present with the people you love.</p></section>

    <section className="about content-block"><img src={A+'556366a8c20c0c16.JPG'} alt="Madhu, photographer"/><div><p className="eyebrow">Meet the photographer</p><h2>Hi! I'm Madhu</h2><p>I’m the founder and lead photographer behind ijós Moments.</p><p>I’ve been photographing people and stories since 2013. My approach is simple: help you feel comfortable, blend into the background when the moments matter, and capture your day as naturally as it unfolds.</p><p>The best compliment I can receive is hearing that it felt like having a friend with a camera, not a photographer taking over the day.</p></div></section>

    <section className="service left content-block"><div><h2>Wedding Day</h2><p>From intimate solemnisations to multi-day wedding celebrations, we create photos and videos that let you relive the people, emotions and moments that made the day yours.</p></div><Rail images={wedding} label="Wedding day gallery"/></section>
    <section className="service right content-block"><Rail images={pre} label="Pre-wedding gallery"/><div><h2>Pre-wedding shoots</h2><p>Meaningful pre wedding photography that captures this chapter of your story with honesty, warmth and timeless style.</p></div></section>
    <section className="service left content-block"><div><h2>Proposal</h2><p>Planning the perfect proposal? We’ll work behind the scenes to ensure every meaningful moment is beautifully and discreetly captured.</p></div><Rail images={proposal} label="Proposal gallery"/></section>

    <section className="testimonial content-block"><div><blockquote>“Madhu was our superstar wedding photographer... She moved around the ceremony, the cocktails at the bar and the dinner, and managed to get the most beautiful, intimate, authentic, fun, lively shots of everybody attending our wedding. Although the lighting in the venue wasn't great, she did her magic and produced professional quality photos... everybody absolutely adored her work.”</blockquote><p>Marianna Pascal</p></div><img src={A+'testimonial-marianna.jpg'} alt="Marianna Pascal" loading="lazy"/></section>

    <section className="packages content-block"><img src={A+'2e4d33a64348961a.jpg'} alt="Wedding couple"/><div>{[['Full day (10 hrs) Actual Day packages','$ 1800'],['Half day (6 hrs) Actual Day packages','$ 1200'],['Pre-wedding shoot packages','$ 500'],['Proposal packages','$ 300']].map(([n,p])=><div className="price" key={n}><h3>{n}</h3><p>start from {p}</p></div>)}<p className="note">Contact us to get a welcome guide with all package details, FAQs and all other info you will need.</p></div></section>

    <section className="contact content-block" id="contact"><div><h2>Get in touch</h2><p>Fill the form to get in touch and get the welcome guide with package details and all the info you will need to make a decision.</p><p>Ph: +65 8535 4678<br/>Email: photos.ijos@gmail.com</p></div><form onSubmit={e=>{e.preventDefault();setFormSent(true)}}><label>Name *<input placeholder="John Doe" required/></label><label>Email address *<input type="email" placeholder="Your email address" required/></label><label>Mobile number *<input placeholder="Your WhatsApp number" required/></label><label>Service required *<select required defaultValue=""><option value="" disabled>Select option</option><option>Actual day coverage</option><option>Pre-wedding shoots</option><option>Proposal shoot</option></select></label><label>Date of the event *<input type="date" required/></label><label>Message *<textarea placeholder="Any other details you would like to share" required/></label><button type="submit">Send message</button>{formSent&&<p className="form-success" role="status" aria-live="polite">Thank you — your message has been received. We’ll be in touch soon.</p>}</form></section>
    <footer><p>Follow me on Instagram</p><a href="https://www.instagram.com/ijos_moments/">@IJOS_MOMENTS</a><p>© 2026 ijos</p></footer>
  </main>
}
