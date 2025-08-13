import { Routes, Route, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { ThemeProvider } from './context/ThemeContext' 
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'
import SpotifyWidget from './components/SpotifyWidget'
import ToroLoader from './components/ToroLoader'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Research from './pages/Research'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const location = useLocation()

  // Show loading when navigating between pages
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800) // Show Toro for 800ms on page transitions

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <ThemeProvider> 
      <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg transition-colors duration-300">
        <ToroLoader isLoading={isLoading} />
        <Navbar />
        <main className="flex-grow container mx-auto px-4 sm:px-6 py-4 sm:py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/research" element={<Research />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <CommandPalette />
        <SpotifyWidget />
      </div>
    </ThemeProvider>
  )
}

export default App