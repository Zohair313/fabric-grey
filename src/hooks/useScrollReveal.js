import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal() {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right, .scale-in'

    const observe = () => {
      const elements = document.querySelectorAll(selectors)

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('visible')
              }, i * 60)
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
      )

      elements.forEach(el => observer.observe(el))
      return observer
    }

    const observer = observe()
    return () => observer.disconnect()
  }, []) // ← run only once on mount
}

export function useParallax(ref, speed = 0.3) {
  useEffect(() => {
    if (!ref.current) return

    const el = ref.current

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const offsetY = (window.innerHeight / 2 - rect.top - rect.height / 2) * speed
      el.style.transform = `translateY(${offsetY}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [ref, speed])
}
