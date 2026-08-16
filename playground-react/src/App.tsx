import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import FloatingGrid from './components/FloatingGrid'
import HeroPage from './pages/HeroPage'
import PlaygroundPage from './pages/PlaygroundPage'
import AboutPage from './pages/AboutPage'
import ProblemsPage from './pages/ProblemsPage'
import ProblemDetailPage from './pages/ProblemDetailPage'

/** Reset scroll to top on every route change. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  // Lenis smooth scroll — exponential ease-out (active wherever the page
  // itself scrolls; the hero and playground lock the body instead).
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
    }
  }, [])

  return (
    <HashRouter>
      <ScrollToTop />
      {/* The signature background — 3D purple dot field */}
      <FloatingGrid />
      {/* Film grain over everything */}
      <div className="noise-overlay" aria-hidden="true" />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/:id" element={<ProblemDetailPage />} />
        <Route path="*" element={<HeroPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App