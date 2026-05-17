import { useState, useEffect, useCallback } from 'react'
import assistantImg from '../assets/assistant.png'

export default function Assistant() {
  const [side, setSide] = useState('right')
  const [isVisible, setIsVisible] = useState(false)
  const [showBubble, setShowBubble] = useState(false)
  const [whatsappLink, setWhatsappLink] = useState('https://wa.me/923001234567?text=Hi!%20I%27m%20interested%20in%20your%20discounted%20fabric%20prices.')

  useEffect(() => {
    fetch('http://localhost:8000/api/settings/')
      .then(res => res.json())
      .then(data => {
        if (data && data.whatsapp_number) {
          const message = data.default_message || "Hi! I'm interested in your discounted fabric prices."
          setWhatsappLink(`https://wa.me/${data.whatsapp_number}?text=${encodeURIComponent(message)}`)
        }
      })
      .catch(err => console.error("Error fetching WhatsApp settings:", err))
  }, [])
  
  // Decide side on load
  useEffect(() => {
    const lastSide = sessionStorage.getItem('assistantSide')
    const currentSide = lastSide === 'right' ? 'left' : 'right'
    setSide(currentSide)
    sessionStorage.setItem('assistantSide', currentSide)

    // Trigger appearance
    const entryTimer = setTimeout(() => {
      setIsVisible(true)
      setShowBubble(true)
    }, 1500)

    // Auto-dismiss after 10s
    const dismissTimer = setTimeout(() => {
      setIsVisible(false)
      setShowBubble(false)
    }, 11500)

    return () => {
      clearTimeout(entryTimer)
      clearTimeout(dismissTimer)
    }
  }, [])

  const handleCallMe = useCallback(() => {
    // Speak
    if ('speechSynthesis' in window) {
      const msg = new SpeechSynthesisUtterance("We have discounted prices, chat with us on WhatsApp.")
      
      // Try to find a female voice
      const voices = window.speechSynthesis.getVoices()
      const femaleVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Google UK English Female') || v.name.includes('Samantha'))
      if (femaleVoice) msg.voice = femaleVoice
      
      msg.rate = 0.9
      msg.pitch = 1.1
      window.speechSynthesis.speak(msg)
    }

    // Re-show assistant and bubble
    setIsVisible(true)
    setShowBubble(true)

    // Open WhatsApp
    window.open(whatsappLink, '_blank')
  }, [])

  return (
    <>
      {/* Floating Character */}
      <div className={`assistant-wrap side-${side} ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="assistant-content">
          {showBubble && (
            <div className={`speech-bubble side-${side}`}>
              We have discounted prices! <a href={whatsappLink} target="_blank" rel="noreferrer">Chat with us</a>
              <div className="bubble-arrow" />
            </div>
          )}
          <img 
            src={assistantImg} 
            alt="Assistant" 
            className="assistant-img" 
            onMouseMove={() => setIsVisible(true)}
          />
        </div>
      </div>

      {/* Call Me CTA */}
      <button className="call-me-btn" onClick={handleCallMe}>
        <div className="call-me-pulse" />
        <span className="call-me-icon">📞</span>
        <span className="call-me-text">Call Me</span>
      </button>

      <style dangerouslySetInnerHTML={{ __html: `
        .assistant-wrap {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9999;
          transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
          pointer-events: auto;
        }

        .assistant-wrap.side-right { right: -100px; transform: translateY(-50%) rotate(-8deg); }
        .assistant-wrap.side-left { left: -100px; transform: translateY(-50%) rotate(8deg); }

        .assistant-wrap.side-right.visible { right: -50px; }
        .assistant-wrap.side-left.visible { left: -50px; }

        /* Peek effect on hover */
        .assistant-wrap:hover.side-right { right: -20px !important; transform: translateY(-56%) rotate(-4deg); }
        .assistant-wrap:hover.side-left { left: -20px !important; transform: translateY(-56%) rotate(4deg); }

        .assistant-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .assistant-img {
          width: clamp(140px, 20vw, 220px);
          height: auto;
          filter: drop-shadow(0 10px 20px rgba(0,0,0,0.1));
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          mix-blend-mode: multiply;
        }
        .assistant-img:hover { transform: scale(1.05); }

        .speech-bubble {
          position: absolute;
          bottom: 110%;
          background: white;
          padding: 12px 18px;
          border-radius: 15px;
          font-size: 0.85rem;
          color: var(--espresso);
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          width: 180px;
          text-align: center;
          font-weight: 500;
          animation: bubble-pop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .speech-bubble a {
          color: #25D366;
          text-decoration: underline;
          display: block;
          margin-top: 4px;
        }

        .bubble-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -8px;
          border-width: 8px;
          border-style: solid;
          border-color: white transparent transparent transparent;
        }

        .side-right .bubble-arrow { left: 70%; }
        .side-left .bubble-arrow { left: 30%; }

        @keyframes bubble-pop {
          from { transform: scale(0.5); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* ── Call Me Button ── */
        .call-me-btn {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: var(--espresso);
          color: var(--cream);
          border: none;
          padding: 12px 24px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-body);
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-size: 0.8rem;
          cursor: none; /* Custom site cursor applies */
          z-index: 9998;
          box-shadow: 0 10px 25px rgba(42,31,23,0.3);
          transition: all 0.3s ease;
        }

        .call-me-btn:hover {
          transform: translateY(-5px);
          background: var(--warm-brown);
        }

        .call-me-pulse {
          position: absolute;
          inset: 0;
          border-radius: 50px;
          border: 2px solid var(--espresso);
          animation: call-pulse 2s infinite;
          opacity: 0;
        }

        @keyframes call-pulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        @media (max-width: 768px) {
          .assistant-wrap { bottom: 100px; top: auto; transform: none; }
          .call-me-btn { bottom: 20px; right: 20px; padding: 10px 18px; font-size: 0.7rem; }
        }
      ` }} />
    </>
  )
}
