import { useState, useRef } from 'react'
import { useScrollReveal, useParallax } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const heroFabricBg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E`

export default function Contact() {
  useScrollReveal()
  const [sent, setSent] = useState(false)
  const heroBgRef = useRef(null)
  useParallax(heroBgRef, 0.15)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <main className="grey-contact-page">
      <style>{`
        .grey-contact-page {
          background: var(--cream);
          color: var(--espresso);
          min-height: 100vh;
          font-family: 'Jost', sans-serif;
        }

        .contact-hero {
          height: 100vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--espresso);
        }

        .contact-hero-bg {
          position: absolute;
          inset: 0;
          background-image: 
            url("${heroFabricBg}"),
            repeating-linear-gradient(45deg, rgba(200,185,168,0.04) 0px, rgba(200,185,168,0.04) 2px, transparent 2px, transparent 8px);
          background-size: 400px 400px, 8px 8px;
        }

        .contact-container {
          padding: 8rem 5vw;
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 10vw;
          align-items: start;
        }

        .contact-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(3.5rem, 6vw, 6rem);
          font-weight: 300;
          line-height: 0.95;
          margin-bottom: 4rem;
          font-style: italic;
        }

        .info-group {
          margin-bottom: 5rem;
        }

        .info-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.25rem;
          opacity: 0.5;
          margin-bottom: 1.5rem;
          display: block;
        }

        .info-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          line-height: 1.4;
          font-weight: 400;
        }

        .form-card {
          background: #FFFFFF;
          padding: 5rem;
          position: relative;
          border: 1px solid rgba(42, 31, 23, 0.08);
          box-shadow: 0 40px 80px rgba(42, 31, 23, 0.03);
        }

        .form-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("${heroFabricBg}");
          background-size: 200px 200px;
          opacity: 0.03;
          pointer-events: none;
        }

        .grey-input-group {
          margin-bottom: 3rem;
        }

        .grey-label {
          display: block;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15rem;
          margin-bottom: 1rem;
          opacity: 0.6;
        }

        .grey-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 1px solid rgba(42, 31, 23, 0.2);
          padding: 1.2rem 0;
          font-family: inherit;
          font-size: 1.1rem;
          outline: none;
          transition: border-color 0.4s;
        }

        .grey-input:focus {
          border-bottom-color: var(--espresso);
        }

        .grey-submit {
          background: var(--espresso);
          color: var(--cream);
          border: none;
          padding: 1.8rem 4rem;
          font-family: inherit;
          text-transform: uppercase;
          letter-spacing: 0.3rem;
          font-weight: 600;
          font-size: 0.8rem;
          cursor: pointer;
          width: 100%;
          transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .grey-submit:hover {
          background: #3D2D21;
          transform: translateY(-5px);
        }

        .success-box {
          text-align: center;
          padding: 6rem 0;
        }

        .success-box h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3rem;
          margin-bottom: 1rem;
          font-weight: 300;
        }

        @media (max-width: 991px) {
          .contact-container { grid-template-columns: 1fr; gap: 6rem; padding-top: 5rem; }
          .form-card { padding: 3rem 2rem; }
          .info-value { font-size: 1.4rem; }
          .contact-title { font-size: 3.5rem; }
        }
      `}</style>

      <section className="contact-hero">
        <div ref={heroBgRef} className="contact-hero-bg" />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(4rem, 10vw, 8rem)',
            fontWeight: 300,
            color: 'var(--cream)',
            margin: 0,
            fontStyle: 'italic'
          }}>Get In Touch</h1>
        </div>
      </section>

      <div className="contact-container">
        <div className="contact-left">
          <h1 className="contact-title reveal">Procurement <br/> Inquiry</h1>
          
          <div className="info-group reveal">
            <span className="info-label">Global Logistics</span>
            <div className="info-value">Direct export from Karachi port <br/> to worldwide destinations.</div>
          </div>

          <div className="info-group reveal">
            <span className="info-label">Communication</span>
            <div className="info-value">info@greyfabric.store <br/> +92 322 2548132</div>
          </div>

          <div className="info-group reveal">
            <span className="info-label">Headquarters</span>
            <div className="info-value">Industrial Zone 4, Karachi, <br/> Pakistan.</div>
          </div>
        </div>

        <div className="contact-right reveal">
          <div className="form-card">
            {sent ? (
              <div className="success-box">
                <h2>Request Received</h2>
                <p>An industrial associate will review your procurement request and contact you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grey-input-group">
                  <label className="grey-label">Company Name</label>
                  <input type="text" className="grey-input" required />
                </div>
                <div className="grey-input-group">
                  <label className="grey-label">Representative</label>
                  <input type="text" className="grey-input" required />
                </div>
                <div className="grey-input-group">
                  <label className="grey-label">Professional Email</label>
                  <input type="email" className="grey-input" required />
                </div>
                <div className="grey-input-group">
                  <label className="grey-label">Bulk Quantity Estimate</label>
                  <input type="text" className="grey-input" placeholder="e.g. 5,000 Metres" required />
                </div>
                <div className="grey-input-group">
                  <label className="grey-label">Fabric Specification</label>
                  <textarea className="grey-input" style={{ minHeight: '100px' }} placeholder="e.g. Cotton Drill, 320gsm, Raw Greige..."></textarea>
                </div>
                <button type="submit" className="grey-submit">Submit Request</button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
