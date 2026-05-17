import { Link } from 'react-router-dom'
import { FiInstagram, FiFacebook, FiMail, FiPhone } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div>
          <div className="footer__brand-name" style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800 }}>GR<span className="logo-e">E</span>Y</div>
          <p className="footer__tagline">
            Premium greige fabric from Pakistan.
            The raw base material for designers
            who know where quality starts.
          </p>
          <div className="footer__social">
            <a href="https://instagram.com" className="footer__social-link" aria-label="Instagram" target="_blank" rel="noreferrer">
              <FiInstagram />
            </a>
            <a href="https://facebook.com" className="footer__social-link" aria-label="Facebook" target="_blank" rel="noreferrer">
              <FiFacebook />
            </a>
            <a href="mailto:info@greyfabric.store" className="footer__social-link" aria-label="Email">
              <FiMail />
            </a>
            <a href="tel:+923222548132" className="footer__social-link" aria-label="Phone">
              <FiPhone />
            </a>
          </div>
        </div>

        <div>
          <div className="footer__col-title">Navigation</div>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/stock">Stock</Link></li>
            <li><Link to="/about">About Grey</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer__col-title">Fabric Types</div>
          <ul className="footer__links">
            <li><Link to="/stock?filter=cotton">Cotton Greige</Link></li>
            <li><Link to="/stock?filter=linen">Linen Blend</Link></li>
            <li><Link to="/stock?filter=canvas">Heavy Canvas</Link></li>
            <li><Link to="/stock?filter=cotton">Voile & Sheer</Link></li>
            <li><Link to="/stock?filter=canvas">Custom Weave</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer__col-title">Contact</div>
          <ul className="footer__links">
            <li><a href="mailto:info@greyfabric.store">info@greyfabric.store</a></li>
            <li><a href="tel:+923222548132">+92 322 2548132</a></li>
            <li style={{ color: 'var(--taupe)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Lahore, Punjab<br />Pakistan
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <span className="footer__copy">
          © {new Date().getFullYear()} Grey Fabric. All rights reserved.
        </span>
        <span className="footer__copy">
          Greige · Raw · Pure
        </span>
      </div>
    </footer>
  )
}
