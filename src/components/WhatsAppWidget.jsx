import React, { useState, useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'



const WhatsAppWidget = () => {
  const [settings, setSettings] = useState({
    karachi_number: "923222548132",
    lahore_number: "+92 326 0808232",
    faisalabad_number: "+92 333 4060683",
    default_message: "Hello GRËY! I am interested in your fabric collections."
  })

  useEffect(() => {
    fetch('http://localhost:8000/api/settings/')
      .then(res => res.json())
      .then(data => {
        if (data && (data.karachi_number || data.lahore_number || data.faisalabad_number)) {
          setSettings(data)
        }
      })
      .catch(err => console.error("Error fetching WhatsApp settings:", err))
  }, [])

  const getWhatsappUrl = (number) => {
    const sanitizedNumber = number ? number.replace(/\D/g, '') : ''
    return `https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(settings.default_message)}`
  }

  const locations = [
    { name: 'Karachi', number: settings.karachi_number, color: '#25D366', gradient: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' },
    { name: 'Lahore', number: settings.lahore_number, color: '#128C7E', gradient: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)' },
    { name: 'Faisalabad', number: settings.faisalabad_number, color: '#075E54', gradient: 'linear-gradient(135deg, #075E54 0%, #054a42 100%)' }
  ]

  return (
    <div className="whatsapp-widget-container" style={{ 
      position: 'fixed', 
      bottom: '40px', 
      right: '40px', 
      zIndex: '1000', 
      display: 'flex', 
      alignItems: 'center', 
      gap: '15px' 
    }}>
      
      {locations.map((loc, i) => (
        <div key={i} className="whatsapp-item" style={{ position: 'relative' }}>
          <span className="whatsapp-label">{loc.name}</span>
          <a
            href={getWhatsappUrl(loc.number)}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-icon-link"
            style={{
              width: '56px',
              height: '56px',
              background: loc.gradient,
              color: '#FFF',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
              transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
              textDecoration: 'none',
              position: 'relative',
            }}
          >
            <FaWhatsapp size={26} />
          </a>
        </div>
      ))}

      <style>{`
        .whatsapp-label {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-10px);
          background: var(--espresso);
          color: var(--cream);
          padding: 6px 12px;
          border-radius: 4px;
          font-family: var(--font-body);
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }

        .whatsapp-label::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: var(--espresso);
        }

        .whatsapp-item:hover .whatsapp-label {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-15px);
        }
        
        .whatsapp-icon-link {
          animation: floatIcon 3s ease-in-out infinite;
        }
        .whatsapp-item:nth-child(2) .whatsapp-icon-link { animation-delay: 0.2s; }
        .whatsapp-item:nth-child(3) .whatsapp-icon-link { animation-delay: 0.4s; }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .whatsapp-icon-link:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 12px 30px rgba(0,0,0,0.25);
        }
        
        @media (max-width: 768px) {
          .whatsapp-widget-container {
            bottom: 20px;
            right: 20px;
            gap: 10px;
          }
          .whatsapp-icon-link {
            width: 50px;
            height: 50px;
          }
          .whatsapp-label {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default WhatsAppWidget
