import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import fabric1 from '../assets/1.png'
import fabric1a from '../assets/1a.png'
import fabric2 from '../assets/2.png'
import fabric3 from '../assets/3.png'
import fabric4 from '../assets/4.png'
import fabric5 from '../assets/5.png'
import { Link } from 'react-router-dom'

import { FiInstagram, FiFacebook, FiMail, FiPhone, FiGrid, FiLayers, FiBox, FiTag, FiShoppingBag, FiTruck } from 'react-icons/fi'
import { useScrollReveal, useParallax } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import lookbookFull from '../assets/lookbook_full.png'
import look6 from '../assets/6.jpg'

// Color swatches matching greige/fabric palette
const SWATCHES = [
  { color: '#E8DFD0', name: 'Ecru' },
  { color: '#C8B9A8', name: 'Greige' },
  { color: '#9C8878', name: 'Taupe' },
  { color: '#6B4F3A', name: 'Camel' },
  { color: '#467f8dff', name: 'Espresso' },
  { color: '#B5A898', name: 'Linen' },
]

const FABRICS = [
  {
    name: 'Oxford Weave',
    meta: '40x20 / 120x60 · 140-150gsm',
    tag: 'Cotton',
    bg: '#E8DFD0',
    image: fabric2,
    stock: '2,400m',
  },
  {
    name: 'Poplin Base',
    meta: '40x40 / 133x72 · 110-120gsm',
    tag: 'Cotton',
    bg: '#C8B9A8',
    image: fabric3,
    stock: '1,850m',
  },
  {
    name: 'Cambric Fine',
    meta: '60x60 / 90x88 · 85gsm',
    tag: 'Cotton',
    bg: '#D4C4B0',
    image: fabric4,
    stock: '3,200m',
  },
  {
    name: 'Heavy Canvas',
    meta: '10x10 / 72x40 · 260-340gsm',
    tag: 'Cotton',
    bg: '#9C8878',
    image: fabric5,
    stock: '1,400m',
  },
  {
    name: 'Twill 3/1',
    meta: '16x12 / 108x56 · 250-320gsm',
    tag: 'Cotton',
    bg: '#B5A898',
    image: fabric2,
    stock: '2,100m',
  },
  {
    name: 'Twill 2/1',
    meta: '20x16 / 128x60 · 220-240gsm',
    tag: 'Cotton',
    bg: '#E2D9CC',
    image: fabric3,
    stock: '2,800m',
  }
]

const TESTIMONIALS = [
  {
    quote: '"Grey fabric is the foundation of every collection we produce. The consistency is unmatched — every metre is exactly what we ordered."',
    author: 'Aisha Raza — Creative Director, Studio Naksh',
  },
  {
    quote: '"We\'ve sourced greige from across Pakistan and abroad. Grey consistently delivers the cleanest base cloth we\'ve found at scale."',
    author: 'Omar Farooq — Head of Sourcing, Crescent Textiles',
  },
  {
    quote: '"The raw feel, the drape, the weight — it all translates beautifully once dyed. It\'s our go-to for luxury upholstery projects."',
    author: 'Sana Ali — Interior Designer, Form & Fold',
  },
]

// Fabric texture SVG data URIs for hero background
const heroFabricBg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E`

const CountUp = ({ end, suffix = '', duration = 2.5 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startObj = { val: 0 }
          gsap.to(startObj, {
            val: end,
            duration: duration,
            ease: "power2.out",
            onUpdate: () => {
              setCount(Math.floor(startObj.val))
            }
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function Home() {
  const heroBgRef = useRef(null)
  const heroHeadRef = useRef(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [heroColor, setHeroColor] = useState('#2A1F17')
  const vantaRef = useRef(null)
  const [vantaEffect, setVantaEffect] = useState(null)


  // Parallax on hero fabric bg
  useParallax(heroBgRef, 0.25)
  useScrollReveal()

  // Hero entrance animation
  useEffect(() => {
    if (!heroHeadRef.current) return
    const lines = heroHeadRef.current.querySelectorAll('.h-line')
    gsap.fromTo(
      lines,
      { y: '100%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1.1, stagger: 0.18, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(() => {
      setActiveTestimonial(i => (i + 1) % TESTIMONIALS.length)
    }, 5000)
    // GSAP CountUp implementation
    const stats = [
      { id: '#stat-weights', end: 40, suffix: '+' },
      { id: '#stat-metres', end: 8, suffix: 'M+' }
    ];

    stats.forEach(stat => {
      const el = document.querySelector(stat.id);
      if (el) {
        gsap.to({ val: 0 }, {
          val: stat.end,
          duration: 2,
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
          },
          onUpdate: function () {
            el.textContent = Math.ceil(this.targets()[0].val) + stat.suffix;
          }
        });
      }
    });

    return () => {
      clearInterval(t)
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  // Vanta.js Birds Init
  useEffect(() => {
    if (vantaEffect) vantaEffect.destroy()

    if (window.VANTA && window.VANTA.BIRDS) {
      setVantaEffect(
        window.VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: parseInt(heroColor.replace('#', ''), 16),
          backgroundAlpha: 0.0 // Transparent to show fabric texture
        })
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [heroColor])

  return (
    <main>
      {/* ── HERO ── */}
      <section className="hero" id="hero">
        <div className="hero__bg blueprint-grid">
          <div
            ref={heroBgRef}
            style={{
              width: '100%',
              height: '110%',
              marginTop: '-5%',
              backgroundColor: heroColor,
              backgroundImage: `
                url("${heroFabricBg}"),
                repeating-linear-gradient(0deg, rgba(244,239,232,0.03) 0px, rgba(244,239,232,0.03) 1px, transparent 1px, transparent 40px),
                repeating-linear-gradient(90deg, rgba(244,239,232,0.03) 0px, rgba(244,239,232,0.03) 1px, transparent 1px, transparent 40px),
                radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 100%)
              `,
              backgroundSize: '400px 400px, 40px 40px, 40px 40px, 100% 100%',
              transition: 'background 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
            }}
          />
        </div>
        <div className="hero__overlay" />

        <div className="hero__content">
          <div ref={heroHeadRef}>
            <div className="overflow-hidden">
              <span className="h-line" style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(4rem,9vw,10rem)', color: 'var(--cream)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                Raw.
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="h-line" style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(4rem,9vw,10rem)', color: 'var(--cream)', lineHeight: 0.95, letterSpacing: '-0.02em', fontStyle: 'italic' }}>
                Unfinished.
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="h-line" style={{ display: 'block', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: 'clamp(4rem,9vw,10rem)', color: 'var(--greige)', lineHeight: 0.95, letterSpacing: '-0.02em' }}>
                Pure.
              </span>
            </div>
          </div>

          <div className="hero__right">
            <div className="label" style={{ color: 'var(--gold-leaf)', marginBottom: '1rem' }}>Original Greige · Karachi</div>
            <p className="hero__meta" style={{ fontSize: '1.1rem', letterSpacing: '0.05em', color: 'var(--cream)', opacity: 0.8 }}>
              Specializing in industrial greige since 2019.<br />
              Precision weaving for the discerning vision.
            </p>
            <div className="blueprint-line" style={{ background: 'rgba(255,255,255,0.1)', margin: '1.5rem 0' }} />
            <div className="hero__swatches">
              {SWATCHES.map((s, i) => (
                <div
                  key={i}
                  className="hero__swatch"
                  style={{
                    background: s.color,
                    width: '28px',
                    height: '28px',
                    borderColor: s.color === heroColor ? 'var(--gold-leaf)' : 'rgba(255,255,255,0.1)'
                  }}
                  onClick={() => setHeroColor(s.color)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="hero__scroll-hint">
          <div className="hero__scroll-line" />
          <span className="hero__scroll-text">Scroll</span>
        </div>

        {/* Vanta Birds overlay (flies over text) */}
        <div
          ref={vantaRef}
          style={{
            position: 'absolute',
            top: '15%',
            bottom: '-15%',
            left: 0,
            right: 0,
            zIndex: 1,
            pointerEvents: 'none',
          }}
        />
      </section>

      {/* ── MARQUEE ── */}
      <section className="marquee-section">
        <div className="marquee-track">
          {[...Array(2)].map((_, set) => (
            <div key={set} style={{ display: 'flex', gap: 0 }}>
              {['Grey Fabric', 'Greige', 'Raw Material', 'Pure Texture', 'Woven Origin', 'Natural Base', 'Unfinished Form'].map((word, i) => (
                <div key={i} className="marquee-item">
                  {i % 3 === 1 ? <em>{word}</em> : <span>{word}</span>}
                  <div className="marquee-dot" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section style={{ background: 'var(--off-white)' }}>
        <div className="about">
          <div className="reveal-left">
            <div className="about__label">
              <span className="label" style={{ color: 'var(--gold-leaf)' }}>Legacy & Craft</span>
            </div>
            <h2 className="about__heading" style={{ fontSize: '4.5rem' }}>
              Fabric in its<br /><em className="serif-italic">purest origin</em>
            </h2>
            <div className="blueprint-line" style={{ width: '60px', margin: '2rem 0' }} />
            <p className="about__body text-justify">
              Grey fabric — or greige — is textile in its most honest state.
              Founded in 2019, our Pakistan-based mill focuses on the raw canvas that
              every high-end collection begins from. We preserve the natural character
              of the fibre, ensuring that every metre supplied meets the rigid
              standards of the global textile industry.
            </p>
            <div className="about__stat-row" style={{ borderTop: 'none', padding: 0, gap: '4rem' }}>
              <div>
                <div className="about__stat-num" id="stat-weights">0+</div>
                <div className="label" style={{ fontSize: '0.6rem' }}>Fabric Weights</div>
              </div>
              <div>
                <div className="about__stat-num" id="stat-metres">0M+</div>
                <div className="label" style={{ fontSize: '0.6rem' }}>Metres Supplied</div>
              </div>
            </div>
          </div>

          <div className="about__image-wrap reveal-right" style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '20px', background: 'transparent' }}>
            <div className="about__fabric-card" style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={fabric2} alt="Oxford Fabric" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(244,239,232,0.9)', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="label" style={{ fontSize: '0.65rem', fontWeight: 800 }}>Oxford: 40x20 / 120x60</span>
                <span className="label" style={{ fontSize: '0.65rem' }}>140-150 GSM</span>
              </div>
            </div>
            <div className="about__fabric-card" style={{ position: 'relative', overflow: 'hidden' }}>
              <img src={fabric3} alt="Poplin Fabric" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(244,239,232,0.9)', padding: '10px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="label" style={{ fontSize: '0.65rem', fontWeight: 800 }}>Poplin: 40x40 / 133x72</span>
                <span className="label" style={{ fontSize: '0.65rem' }}>110-120 GSM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COLLECTION ── */}
      <section className="collection">
        <div className="collection__header">
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            <a href="mailto:info@greyfabric.store" className="collection__link" style={{ fontSize: '0.8rem' }}>Direct Inquiry →</a>
            <Link to="/stock" className="collection__link">Explore Stock →</Link>
          </div>
        </div>
        <div className="collection__grid">
          {FABRICS.slice(0, 4).map((fabric, i) => {
            const defaultColors = ['#C8B9A8', '#D4C4B0', '#E2D9CC', '#9C8878'];
            const imageUrl = fabric.image;
            const fabricColor = fabric.color || fabric.bg || defaultColors[i % defaultColors.length];
            const texture = `repeating-linear-gradient(45deg, ${fabricColor} 0px, rgba(0,0,0,0.05) 2px, ${fabricColor} 4px)`;

            return (
              <div key={i} className={`fabric-card scale-in`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div
                  className="fabric-card__img"
                  style={{
                    background: imageUrl ? `url(${imageUrl})` : fabricColor,
                    backgroundImage: imageUrl ? `url(${imageUrl})` : texture,
                    backgroundSize: imageUrl ? 'cover' : '10px 10px',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    inset: 0,
                  }}
                />
                {/* Woven cross-hatch overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: imageUrl ? 'none' : `
                    repeating-linear-gradient(0deg, transparent 0, transparent 6px, rgba(0,0,0,0.03) 6px, rgba(0,0,0,0.03) 7px),
                    repeating-linear-gradient(90deg, transparent 0, transparent 6px, rgba(0,0,0,0.03) 6px, rgba(0,0,0,0.03) 7px)
                  `,
                  backgroundSize: '7px 7px',
                }} />
                <span className="fabric-card__tag">{fabric.tag}</span>
                <div className="fabric-card__overlay" />
                <div className="fabric-card__info">
                  <div className="fabric-card__name">{fabric.name}</div>
                  <div className="fabric-card__meta">{fabric.weight}</div>
                  <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4CAF50' }}></span>
                    <span style={{ fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--greige-mid)', fontWeight: 500 }}>
                      In Stock: {fabric.stock}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ background: 'var(--off-white)' }}>
        <div className="process">
          <div className="process__header">
            <div className="reveal-left">
              <span className="label" style={{ display: 'block', marginBottom: '1.5rem' }}>How We Work</span>
              <h2 className="process__heading">From loom<br />to doorstep</h2>
            </div>
            <p className="process__intro reveal-right">
              Every roll of Grey fabric passes through a meticulous chain — from raw fibre selection
              to final quality inspection — before it reaches your production line.
            </p>
          </div>
          <div className="process__steps" style={{ display: 'flex', flexDirection: 'column', gap: '0', border: 'none' }}>
            {[
              { n: '01', title: 'Fibre Selection', text: 'We source cotton and linen from trusted farms, selecting only fibres that meet our density and purity benchmarks.' },
              { n: '02', title: 'Weaving', text: 'Woven on industrial looms calibrated for consistent thread count, selvedge alignment, and weight uniformity.' },
              { n: '03', title: 'Grey State', text: 'The cloth is kept in its greige state — no bleach, no dye, no sizing compounds — preserving natural character.' },
              { n: '04', title: 'Quality & Dispatch', text: 'Every batch is inspected for defects, tension, and GSM before being rolled, labelled, and dispatched.' },
            ].map((step, i) => (
              <div key={i} className="process__step reveal" style={{
                display: 'grid',
                gridTemplateColumns: '120px 1fr 300px',
                gap: '4rem',
                padding: '4rem 0',
                borderTop: '1px solid var(--divider)',
                alignItems: 'center'
              }}>
                <div className="process__step-num" style={{ fontSize: '3rem', margin: 0 }}>{step.n}</div>
                <div>
                  <div className="process__step-title" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{step.title}</div>
                  <div className="label" style={{ fontSize: '0.6rem', color: 'var(--gold-leaf)' }}>Protocol Verified</div>
                </div>
                <p className="process__step-text" style={{ textAlign: 'right', margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOOKBOOK / THE COLOUR OF RAW ── */}
      <section className="lookbook" style={{ padding: 0, background: '#fff', overflow: 'hidden' }}>
        <img 
          src={look6} 
          alt="Lookbook Detail" 
          style={{ 
            width: '100%', 
            height: 'auto', 
            display: 'block'
          }} 
        />
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="testimonials">
        <div className="testimonials__label">
          <span className="label" style={{ color: 'var(--taupe)' }}>Client Words</span>
        </div>
        <div className="testimonial-item">
          <p className="testimonial-quote" style={{ transition: 'opacity 0.4s' }}>
            {TESTIMONIALS[activeTestimonial].quote}
          </p>
          <div className="testimonial-author">
            — {TESTIMONIALS[activeTestimonial].author}
          </div>
        </div>
        <div className="testimonials__dots">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              className={`testimonials__dot${i === activeTestimonial ? ' active' : ''}`}
              onClick={() => setActiveTestimonial(i)}
            />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <h2 className="cta-section__heading reveal">
          Ready to source <em>raw</em> fabric?
        </h2>
        <p className="cta-section__sub reveal">
          Whether you're a fashion house, home goods brand, or textile importer —
          Grey delivers consistent greige at every scale.
        </p>
        <div className="reveal">
          <a href="mailto:info@greyfabric.store" className="cta-btn"><span>Request Samples</span></a>
          <Link to="/stock" className="cta-btn-outline">Browse Stock</Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}


