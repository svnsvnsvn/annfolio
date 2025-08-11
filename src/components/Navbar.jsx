import { Link, useLocation } from 'react-router-dom'
import { useTheme, useCommandPalette } from '../context/ThemeContext'
import { Search, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { toggleCommandPalette } = useCommandPalette()
  const [isMac, setIsMac] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])
  
  const navLinks = [
  { path: '/', label: 'home' },
  { path: '/projects', label: 'projects' },
  { path: '/research', label: 'research' }, 
  { path: '/about', label: 'about' },
  { path: '/contact', label: 'contact' }
  ]
  
  return (
    <nav className="bg-light-surface dark:bg-dark-surface border-b border-light-hover dark:border-dark-surface transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-200 z-20">
            <img 
              src="/folio_logo.png" 
              alt="Portfolio Logo" 
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
            />
          </Link>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            <ul className="flex space-x-6 xl:space-x-8 font-mono">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`hover:text-light-pink dark:hover:text-brand-pink transition-all duration-300 hover:scale-105 text-sm xl:text-base ${
                      location.pathname === path 
                        ? 'text-light-pink dark:text-brand-pink' 
                        : 'text-light-text-secondary dark:text-dark-text-secondary'
                    }`}
                  >
                    {location.pathname === path ? '> ' : ''}{label}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Desktop Search */}
            <button
              onClick={toggleCommandPalette}
              className="flex items-center gap-2 px-3 py-1.5 bg-light-hover dark:bg-dark-surface border border-light-hover dark:border-dark-hover text-light-text-muted dark:text-dark-text-muted hover:text-light-text-secondary dark:hover:text-dark-text-secondary hover:border-light-pink dark:hover:border-brand-pink transition-all duration-200 rounded-lg text-sm"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden xl:inline-block ml-2 px-1.5 py-0.5 text-xs bg-light-bg dark:bg-dark-bg border border-light-hover dark:border-dark-surface rounded">
                {isMac ? '⌘' : 'Ctrl'} K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="text-light-text-muted dark:text-dark-text-muted hover:text-light-pink dark:hover:text-brand-pink transition-colors duration-200 text-sm font-mono"
            >
              [{theme === 'dark' ? 'light' : 'dark'}]
            </button>
          </div>

          {/* Mobile/Tablet Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Search Button */}
            <button
              onClick={toggleCommandPalette}
              className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-pink dark:hover:text-brand-pink transition-colors duration-200"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-pink dark:hover:text-brand-pink transition-colors duration-200 z-30"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-20 bg-light-bg/98 dark:bg-dark-bg/98 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center h-full space-y-6 font-mono px-4">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`text-xl sm:text-2xl hover:text-light-pink dark:hover:text-brand-pink transition-all duration-300 hover:scale-105 ${
                    location.pathname === path 
                      ? 'text-light-pink dark:text-brand-pink' 
                      : 'text-light-text-secondary dark:text-dark-text-secondary'
                  }`}
                >
                  {location.pathname === path ? '> ' : ''}{label}
                </Link>
              ))}
              
              {/* Mobile Menu Footer */}
              <div className="mt-8 pt-6 border-t border-light-hover dark:border-dark-surface">
                <p className="text-xs text-light-text-muted dark:text-dark-text-muted text-center">
                  Tap search icon for command palette
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar