import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useScrollReveal, useParallax } from '../hooks/useScrollReveal'
import Footer from '../components/Footer'
import oxford from '../assets/oxford.jpg'
import poplin from '../assets/poplin.jpg'
import cambric from '../assets/cambric_new.jpg'
import canvas from '../assets/canvas_new.jpg'
import twill31 from '../assets/twill31_new.jpg'
import twill21 from '../assets/twill21_new.jpg'

const GREY_PRODUCTS = [
  { id: 101, name: 'Oxford Weave', category: 'Cotton', weight: '140-150gsm', stock: '2,400m', image: oxford, ref_no: 'OX-4020' },
  { id: 102, name: 'Poplin Base', category: 'Cotton', weight: '110-120gsm', stock: '1,850m', image: poplin, ref_no: 'PP-4040' },
  { id: 103, name: 'Cambric Fine', category: 'Cotton', weight: '85gsm', stock: '3,200m', image: cambric, ref_no: 'CB-6060' },
  { id: 104, name: 'Heavy Canvas', category: 'Cotton', weight: '260-340gsm', stock: '1,400m', image: canvas, ref_no: 'CV-1010' },
  { id: 105, name: 'Twill 3/1', category: 'Cotton', weight: '250-320gsm', stock: '2,100m', image: twill31, ref_no: 'TW-3116' },
  { id: 106, name: 'Twill 2/1', category: 'Cotton', weight: '220-240gsm', stock: '2,800m', image: twill21, ref_no: 'TW-2120' },
]


const heroFabricBg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E`

export default function Collection() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({ next: null, prev: null })
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)

  const fetchProducts = async (page = 1, search = '') => {
    setLoading(true)
    try {
      const response = await axios.get(`http://localhost:8000/api/stocks/?page=${page}&search=${search}`)
      const rawResults = response.data.results || []
      const formattedData = rawResults.map(p => ({
        ...p,
        image: p.image && typeof p.image === 'string' && !p.image.startsWith('http') 
          ? `http://localhost:8000${p.image}` 
          : p.image
      }))
      setProducts(formattedData)
      setPagination({
        next: response.data.next,
        prev: response.data.previous,
        count: response.data.count
      })
      setCurrentPage(page)
      window.scrollTo(0, 0)
    } catch (error) {
      console.error("Error fetching products:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const heroBgRef = useRef(null)
  useParallax(heroBgRef, 0.2)
  useScrollReveal([products])

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
          height: 100vh;
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

        .collection__link:hover {
          color: var(--espresso) !important;
          border-color: var(--espresso) !important;
        }

        .img-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(42, 31, 23, 0.95);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          cursor: zoom-out;
        }

        .img-popup-content {
          max-width: 90vw;
          max-height: 90vh;
          object-fit: contain;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5);
          cursor: default;
        }

        .img-popup-close {
          position: absolute;
          top: 2rem;
          right: 2rem;
          color: var(--cream);
          font-size: 2rem;
          cursor: pointer;
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
          margin-bottom: 2rem;
        }

        .spec-table {
          width: 100%;
          border-top: 1px solid var(--divider);
          margin-top: 2rem;
          font-size: 0.7rem;
          letter-spacing: 0.05em;
        }

        .spec-row {
          display: grid;
          grid-template-columns: 140px 1fr;
          padding: 0.8rem 0;
          border-bottom: 1px solid var(--divider);
        }

        .spec-label {
          text-transform: uppercase;
          font-weight: 600;
          color: var(--taupe);
          font-size: 0.6rem;
        }

        .spec-value {
          color: var(--espresso);
          text-align: right;
        }

        .color-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .color-chip {
          padding: 0.4rem;
          background: rgba(42, 31, 23, 0.03);
          border: 1px solid var(--divider);
          text-align: center;
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
          <h1 className="coll-hero-title">The Stock</h1>
          <p className="coll-hero-meta">Karachi Industrial Excellence</p>
        </div>
      </section>

      <div className="coll-container">
        <div className="coll-filter-bar reveal" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end',
          gap: '2rem' 
        }}>
          <div>
            {searchQuery ? (
              <>
                <span className="filter-label">Search Results</span>
                <div style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>
                  {loading ? 'Searching...' : `Found ${pagination.count || 0} results for "${searchQuery}"`}
                </div>
              </>
            ) : (
              <>
                  <div style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>
                    {loading ? 'Loading Stock...' : `Total Batches (${pagination.count || '00'})`}
                  </div>
              </>
            )}
          </div>
          
          <div className="search-box" style={{ flex: '0 1 400px', position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Search by Ref. No or Name..." 
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                fetchProducts(1, val);
              }}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                borderBottom: '1px solid var(--espresso)',
                padding: '0.75rem 0',
                fontSize: '0.9rem',
                fontFamily: 'inherit',
                color: 'var(--espresso)',
                outline: 'none',
                letterSpacing: '0.05em'
              }}
            />
            <span style={{ position: 'absolute', right: '0', bottom: '10px', opacity: 0.4 }}>🔍</span>
          </div>
        </div>

        {/* Stock Status Notice */}
        {products.length === 0 && searchQuery !== '' && !loading && (
          <div className="stock-notice reveal" style={{
            marginTop: '2rem',
            padding: '1rem 1.5rem',
            background: 'rgba(107, 79, 58, 0.05)',
            borderLeft: '2px solid var(--taupe)',
            fontSize: '0.75rem',
            letterSpacing: '0.05em',
            color: 'var(--espresso)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            <span style={{ fontWeight: 600, color: 'var(--warm-brown)' }}>● INVENTORY NOTICE</span>
            <span>No fabrics matching "{searchQuery}" were found. Current batches are in high demand with fluctuating stock levels. Please inquire via WhatsApp for real-time availability.</span>
          </div>
        )}

        <div className="grey-grid">
          {products.map((product, i) => (
            <div key={product.id} className="grey-card reveal" style={{ transitionDelay: `${i * 0.1}s`, cursor: 'default' }}>
              <div 
                onClick={() => setSelectedImage(product.image)}
                className="grey-card-img-wrap" 
                style={{ border: 'none', background: 'var(--greige-mid)', display: 'block', cursor: 'zoom-in' }}
              >
                <img src={product.image} alt={product.name} className="grey-card-img" />
                <div className="grey-card-texture" />
                <div style={{ 
                  position: 'absolute', 
                  top: '1rem', 
                  right: '1rem', 
                  padding: '0.4rem 0.8rem', 
                  background: 'var(--ink)', 
                  fontSize: '0.6rem', 
                  letterSpacing: '0.2em', 
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  color: 'white',
                  zIndex: 2
                }}>
                  Ref: {product.ref_no || 'N/A'}
                </div>
              </div>
              
              <div className="grey-card-info">
                <div>
                  <div className="label" style={{ fontSize: '0.6rem', color: 'var(--gold-leaf)', marginBottom: '0.5rem' }}>Verified {product.is_grey ? 'Grey' : 'Dyed'}</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 300, lineHeight: 1 }}>{product.name}</h3>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="label" style={{ fontSize: '0.55rem', opacity: 0.4 }}>Price per meter</div>
                  <div style={{ color: 'var(--ink)', fontWeight: 600, fontSize: '1.2rem' }}>Rs. {product.price_per_meter}</div>
                </div>
              </div>

              <div className="spec-table">
                <div className="spec-row">
                  <span className="spec-label">Composition</span>
                  <span className="spec-value">{product.composition || 'Standard Blend'}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Construction</span>
                  <span className="spec-value">{product.construction || 'Woven'}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Fabric Width</span>
                  <span className="spec-value">{product.fabric_width || '58"'}</span>
                </div>
                <div className="spec-row">
                  <span className="spec-label">Finish / Process</span>
                  <span className="spec-value">{product.finish} {product.special_process ? `(${product.special_process})` : ''}</span>
                </div>
              </div>

              {product.is_dyed && product.colors && product.colors.length > 0 && (
                <div style={{ marginTop: '2rem' }}>
                  <div className="label" style={{ fontSize: '0.6rem', marginBottom: '1rem' }}>Available Dyed Inventory</div>
                  <div className="color-grid">
                    {product.colors.map((c, idx) => (
                      <div key={idx} className="color-chip">
                        <div style={{ fontSize: '0.55rem', fontWeight: 600 }}>{c.color_name}</div>
                        <div style={{ fontSize: '0.5rem', opacity: 0.6 }}>{c.quantity}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '0.6rem', color: 'var(--taupe)' }}>Validity: {product.validity_days} Days</div>
                <a href="mailto:info@greyfabric.store" className="collection__link" style={{ fontSize: '0.7rem' }}>Request Sample →</a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="coll-pagination" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          padding: '4rem 0 8rem',
          borderTop: '1px solid rgba(42, 31, 23, 0.05)'
        }}>
          <button 
            onClick={() => fetchProducts(currentPage - 1, searchQuery)}
            disabled={!pagination.prev}
            className="pagination-btn"
            style={{
              opacity: pagination.prev ? 1 : 0.3,
              pointerEvents: pagination.prev ? 'auto' : 'none',
              background: 'none',
              border: 'none',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--espresso)'
            }}
          >
            ← Prev
          </button>
          
          <span style={{ fontSize: '0.75rem', opacity: 0.5, letterSpacing: '0.1em', color: 'var(--espresso)' }}>
            PAGE {currentPage}
          </span>

          <button 
            onClick={() => fetchProducts(currentPage + 1, searchQuery)}
            disabled={!pagination.next}
            className="pagination-btn"
            style={{
              opacity: pagination.next ? 1 : 0.3,
              pointerEvents: pagination.next ? 'auto' : 'none',
              background: 'none',
              border: 'none',
              fontSize: '0.8rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--espresso)'
            }}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Image Popup Modal */}
      {selectedImage && (
        <div className="img-popup-overlay" onClick={() => setSelectedImage(null)}>
          <div className="img-popup-close" onClick={() => setSelectedImage(null)}>×</div>
          <img 
            src={selectedImage} 
            alt="Full size" 
            className="img-popup-content" 
            onClick={(e) => e.stopPropagation()} 
          />
        </div>
      )}

      <Footer />
    </main>
  )
}
