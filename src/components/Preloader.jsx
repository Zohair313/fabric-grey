import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Preloader() {
  const loaderRef = useRef(null)
  const logoRef = useRef(null)
  const lineRef = useRef(null)
  const countRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // logo reveal
    tl.to(logoRef.current, {
      clipPath: 'inset(0 0% 0 0)',
      duration: 1.2,
      ease: 'power3.inOut',
      delay: 0.3,
    })
      // line grow
      .to(lineRef.current, {
        width: '200px',
        duration: 0.8,
        ease: 'power2.out',
      }, '-=0.4')
      // count up
      .call(() => {
        let count = 0
        const interval = setInterval(() => {
          count += Math.floor(Math.random() * 15) + 5
          if (count >= 100) {
            count = 100
            clearInterval(interval)
          }
          if (countRef.current) countRef.current.textContent = count + '%'
        }, 60)
      }, null, '-=0.8')
      // fade out
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1,
        ease: 'power3.inOut',
        delay: 1.2,
      })

    return () => tl.kill()
  }, [])

  return (
    <div className="preloader" ref={loaderRef}>
      <div
        className="preloader__logo"
        ref={logoRef}
        style={{ clipPath: 'inset(0 100% 0 0)', textTransform: 'uppercase', letterSpacing: '0.2em', fontWeight: 800 }}
      >
        GR<span className="logo-e">E</span>Y
      </div>
      <div className="preloader__line" ref={lineRef} />
      <div className="preloader__count" ref={countRef}>0%</div>
    </div>
  )
}
