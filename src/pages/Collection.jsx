import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useScrollReveal, useParallax } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'

const GREY_PRODUCTS = [
  { id: 101, name: 'Industrial Cotton', category: 'Heavy Duty', weight: '320gsm', stock: '2,400m', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800' },
  { id: 102, name: 'Standard Greige', category: 'Raw Material', weight: '180gsm', stock: '1,150m', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800' },
  { id: 103, name: 'Woven Twill', category: 'Apparel', weight: '220gsm', stock: '850m', image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800' },
  { id: 104, name: 'Canvas Pro', category: 'Technical', weight: '450gsm', stock: '3,200m', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800' },
  { id: 105, name: 'Fine Muslin', category: 'Sheer', weight: '90gsm', stock: '1,200m', image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800' },
  { id: 106, name: 'Linen Base', category: 'Natural', weight: '160gsm', stock: '500m', image: 'https://images.unsplash.com/photo-1529139572765-397437ef19b2?auto=format&fit=crop&q=80&w=800' },
]


const heroFabricBg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E`

export default function Collection() {
  useScrollReveal()
  const heroBgRef = useRef(null)
  useParallax(heroBgRef, 0.2)

  return (
    <main className="grey-coll-page">
      <style>{`
        .grey-coll-page {
          background: var(--cream);
          color: var(--espresso);
          min-height: 100vh;
          font-family: 'Jost', sans-serif;
        }

        .coll-hero {
          height: 60vh;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: var(--espresso);
        }

        .coll-hero-bg {
          position: absolute;
          inset: 0;
          background-image: 
            url("${heroFabricBg}"),
            repeating-linear-gradient(0deg, rgba(200,185,168,0.05) 0px, rgba(200,185,168,0.05) 1px, transparent 1px, transparent 10px),
            repeating-linear-gradient(90deg, rgba(200,185,168,0.05) 0px, rgba(200,185,168,0.05) 1px, transparent 1px, transparent 10px);
          background-size: 400px 400px, 10px 10px, 10px 10px;
          opacity: 0.6;
        }

        .coll-hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
        }

        .coll-hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(4rem, 10vw, 8rem);
          font-weight: 300;
          color: var(--cream);
          line-height: 1;
          margin-bottom: 1.5rem;
          font-style: italic;
        }

        .coll-hero-meta {
          color: var(--greige);
          text-transform: uppercase;
          letter-spacing: 0.4rem;
          font-size: 0.9rem;
        }

        .coll-container {
          padding: 8rem 5vw;
        }

        .coll-filter-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 6rem;
          border-bottom: 1px solid rgba(42, 31, 23, 0.1);
          padding-bottom: 2rem;
        }

        .filter-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2rem;
          opacity: 0.5;
        }

        .grey-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8rem 4vw;
        }

        .grey-card {
          text-decoration: none;
          color: inherit;
          display: block;
        }

        .grey-card-img-wrap {
          aspect-ratio: 3/2;
          overflow: hidden;
          background: var(--greige);
          margin-bottom: 2.5rem;
          position: relative;
          border: 1px solid rgba(42, 31, 23, 0.05);
        }

        .grey-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
          filter: grayscale(20%);
        }

        .grey-card:hover .grey-card-img {
          transform: scale(1.05);
        }

        .grey-card-texture {
          position: absolute;
          inset: 0;
          background-image: url("${heroFabricBg}");
          background-size: 200px 200px;
          opacity: 0.15;
          pointer-events: none;
        }

        .grey-card-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .grey-card-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .grey-card-cat {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.15rem;
          opacity: 0.6;
        }

        .grey-card-stats {
          text-align: right;
          font-size: 0.75rem;
          opacity: 0.5;
          letter-spacing: 0.1rem;
        }

        .grey-card-stats div {
          margin-bottom: 0.3rem;
        }

        @media (max-width: 991px) {
          .grey-grid { grid-template-columns: 1fr; gap: 6rem; }
          .coll-hero { height: 40vh; }
          .coll-filter-bar { flex-direction: column; align-items: flex-start; gap: 2.5rem; }
          .grey-card-name { font-size: 2rem; }
        }
      `}</style>

      <section className="coll-hero">
        <div ref={heroBgRef} className="coll-hero-bg" />
        <div className="coll-hero-content">
          <h1 className="coll-hero-title">The Archive</h1>
          <p className="coll-hero-meta">Karachi Industrial Excellence</p>
        </div>
      </section>

      <div className="coll-container">
        <div className="coll-filter-bar reveal">
          <div>
            <span className="filter-label">Currently Showing</span>
            <div style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>All Raw Materials (06)</div>
          </div>
          <div className="filter-label">Filtered by Batch Stability</div>
        </div>

        <div className="grey-grid">
          {GREY_PRODUCTS.map((product, i) => (
            <Link to="/contact" key={product.id} className="grey-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="grey-card-img-wrap">
                <img src={product.image} alt={product.name} className="grey-card-img" />
                <div className="grey-card-texture" />
              </div>
              <div className="grey-card-info">
                <div>
                  <div className="grey-card-cat">{product.category}</div>
                  <h3 className="grey-card-name">{product.name}</h3>
                </div>
                <div className="grey-card-stats">
                  <div>{product.weight}</div>
                  <div style={{ color: '#4CAF50', opacity: 1 }}>{product.stock} Stock</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
