import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const FAQS = [
  {
    q: 'Do you offer international shipping?',
    a: 'Yes, we supply greige globally. We coordinate export logistics and ensure safe delivery to your mill or manufacturing facility.'
  },
  {
    q: 'What is your minimum order quantity (MOQ)?',
    a: 'For in-stock greige fabrics, our MOQ is typically 500 metres. For custom weaves or dedicated mill runs, the MOQ starts at 5,000 metres.'
  },
  {
    q: 'Do you provide physical fabric samples?',
    a: 'Yes, we provide sample yardage (2-5 metres) so you can test dyeability, shrinkage, and hand-feel before committing to bulk.'
  },
  {
    q: 'Can I order custom thread counts or GSM?',
    a: 'Absolutely. We work closely with our weaving facilities to develop custom constructions tailored exactly to your brand\'s needs.'
  },
  {
    q: 'What is the standard lead time for bulk orders?',
    a: 'In-stock fabrics can be dispatched within 5-7 days. Custom weaving runs take approximately 3 to 5 weeks depending on yarn availability and weave complexity.'
  },
  {
    q: 'Are your fabrics sustainable?',
    a: 'Our greige is inherently more sustainable than finished fabric as it uses no dyes or chemical sizing. We source cotton from farmers committed to reduced water usage.'
  },
  {
    q: 'Do you offer white or dyed fabric?',
    a: 'We specialize exclusively in "Grey" or greige state fabric. This allows designers to maintain full control over the final finishing and dyeing process.'
  }
]

export default function Faq() {
  useScrollReveal()
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <main className="about-page">
      <div className="about-page__hero" style={{ height: '100vh' }}>
        <h1 className="about-page__title">FAQs</h1>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'var(--space-2xl) var(--gutter)' }}>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, color: 'var(--espresso)', marginBottom: '3rem', textAlign: 'center', fontStyle: 'italic' }}>
          Common Queries
        </h2>
        
        <div>
          {FAQS.map((faq, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s`, borderBottom: '1px solid var(--greige)', padding: '1.5rem 0' }}>
              <button 
                onClick={() => toggle(i)}
                style={{ width: '100%', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.2rem', fontFamily: 'var(--font-display)', color: 'var(--espresso)', cursor: 'none' }}
              >
                <span>{faq.q}</span>
                <span style={{ color: 'var(--taupe)', transition: 'transform 0.3s', transform: openIndex === i ? 'rotate(45deg)' : 'none' }}>+</span>
              </button>
              <div style={{ maxHeight: openIndex === i ? '200px' : '0', overflow: 'hidden', transition: 'all 0.4s ease', opacity: openIndex === i ? 1 : 0 }}>
                <p style={{ paddingTop: '1rem', color: 'var(--charcoal)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
