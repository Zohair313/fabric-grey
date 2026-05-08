import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setScrolled(false)
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav__logo">Grey</Link>

        {/* Desktop Links */}
        <ul className="nav__links desktop-only">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/collection">Collection</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        <div className="nav__right">
          <Link to="/contact" className="cta-btn nav__cta desktop-only">
            <span>Inquire</span>
          </Link>

          <button
            className="nav__mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`nav__mobile-menu ${isOpen ? 'active' : ''}`}>
        <div className="nav__mobile-content">
          <ul className="nav__mobile-links">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/collection" onClick={() => setIsOpen(false)}>Collection</Link></li>
            <li><Link to="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
            <li><Link to="/faq" onClick={() => setIsOpen(false)}>FAQ</Link></li>
          </ul>
          <Link to="/contact" className="cta-btn" onClick={() => setIsOpen(false)} style={{ marginTop: '2rem' }}>
            <span>Request Quote</span>
          </Link>
        </div>
      </div>
    </>
  )
}
