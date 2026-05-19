import { Link } from 'react-router-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

export default function About() {
  useScrollReveal()

  return (
    <main className="about-page">
      <div className="about-page__hero">
        {/* Woven texture bg */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            repeating-linear-gradient(45deg, rgba(200,185,168,0.06) 0px, rgba(200,185,168,0.06) 2px, transparent 2px, transparent 8px),
            repeating-linear-gradient(-45deg, rgba(200,185,168,0.06) 0px, rgba(200,185,168,0.06) 2px, transparent 2px, transparent 8px),
            var(--espresso)
          `,
          backgroundSize: '8px 8px, 8px 8px, 100%',
        }} />
        <h1 className="about-page__title">The Grey Story</h1>
      </div>

      {/* Story */}
      <div className="about-story">
        <div className="reveal-left">
          <span className="label" style={{ display: 'block', marginBottom: '2rem' }}>Our Beginning</span>
          <h2 className="about-story__heading">
            Fabric before the<br />colour arrives
          </h2>
          <p className="about-story__text" style={{ marginBottom: '2rem' }}>
            Grey was founded on a simple belief: the most important moment in any textile's life
            is before it's dyed. The greige state is where quality is decided — in the weave,
            the thread count, the fibre selection, and the GSM.
          </p>
          <p className="about-story__text" style={{ marginBottom: '2rem' }}>
            We started supplying to small Lahore-based fashion houses. Today, our rolls are
            used in ready-to-wear, bespoke tailoring, upholstery studios, and home textile
            brands across Pakistan and the Gulf.
          </p>
          <p className="about-story__text">
            Every relationship we've built has been through one thing: fabric that behaves
            exactly as it's supposed to, batch after batch.
          </p>
        </div>
        <div className="about-story__image reveal-right">
          <div style={{
            width: '100%',
            height: '100%',
            background: `
              repeating-linear-gradient(0deg, #C8B9A8 0px, #BFB09F 3px, #C8B9A8 10px),
              repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 6px)
            `,
            backgroundSize: '10px 10px, 6px 100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              padding: '2.5rem 3rem',
              background: 'rgba(244, 239, 232, 0.88)',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.4rem',
                fontStyle: 'italic',
                color: 'var(--espresso)',
                letterSpacing: '0.1em',
                marginBottom: '0.5rem',
              }}>
                Greige · grey fabric
              </div>
              <div className="label">
                /ɡreɪdʒ/ · noun
              </div>
              <p style={{
                marginTop: '1rem',
                fontSize: '0.85rem',
                color: 'var(--charcoal)',
                fontStyle: 'italic',
                maxWidth: '240px',
                lineHeight: '1.7',
              }}>
                "Raw, unbleached fabric prior to dyeing or finishing processes."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="values-section">
        <h2 className="values-section__heading reveal">What drives us</h2>
        <div className="values-grid">
          {[
            { icon: '⌁', title: 'Purity', text: 'Nothing added. No optical brighteners, no pre-treatment, no chemical sizing. You control what the fabric becomes.' },
            { icon: '◈', title: 'Consistency', text: 'Batch-to-batch uniformity is non-negotiable. Every roll is tested for weight, width, and weave integrity.' },
            { icon: '○', title: 'Scale', text: 'From 10-metre sample cuts to 50,000-metre production runs — we grow with your order.' },
          ].map((v, i) => (
            <div key={i} className="value-card reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className="value-card__icon">{v.icon}</div>
              <div className="value-card__title">{v.title}</div>
              <p className="value-card__text">{v.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Strip */}
      <div style={{
        background: 'var(--espresso)',
        padding: '6rem var(--gutter)',
        textAlign: 'center',
      }}>
        <style>{`
          .about-cta-section .cta-btn:hover {
            color: var(--cream) !important;
            border-color: var(--cream) !important;
            background: transparent !important;
          }
        `}</style>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 4vw, 5rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--cream)',
          marginBottom: '2.5rem',
        }} className="reveal">
          Let's build something together
        </h2>
        <div className="about-cta-section">
          <Link to="/contact" className="cta-btn reveal"><span>Get in Touch</span></Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
