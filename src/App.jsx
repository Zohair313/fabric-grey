import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Faq from './pages/Faq'
import Preloader from './components/Preloader'
import Cursor from './components/Cursor'
import WhatsAppWidget from './components/WhatsAppWidget'

function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
      document.body.classList.add('loaded')
    }, 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Cursor />
      {loading && <Preloader />}
      {!loading && (
        <>
          <div
            className="system-badge"
            style={{
              position: 'fixed',
              bottom: '10px',
              left: '10px',
              background: 'rgba(0,0,0,0.5)',
              color: 'white',
              padding: '5px',
              fontSize: '10px',
              zIndex: 999999,
              pointerEvents: 'none',
            }}
          >
            System Live: v1.1.5
          </div>
          <style>{`
            @media (max-width: 768px) {
              .system-badge { display: none; }
            }
          `}</style>

          <Nav />
          <WhatsAppWidget />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stock" element={<Collection />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
