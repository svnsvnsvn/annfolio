import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/hooks'
import { Search } from 'lucide-react'
import { useState, useEffect } from 'react'

function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)
  }, [])
  
  const navLinks = [
  { path: '/', label: 'home' },
  { path: '/projects', label: 'projects' },
  { path: '/research', label: 'research' }, 
  { path: '/about', label: 'about' },
  { path: '/contact', label: 'contact' }
  ]
  
  return (
    <nav className="bg-light-surface dark:bg-dark-surface border-b border-light-hover dark:border-dark-surface transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center hover:scale-105 transition-transform duration-200">
            <img 
              src="/folio_logo.png" 
              alt="Portfolio Logo" 
              className="w-12 h-12 object-contain"
            />
          </Link>
          <div className="flex items-center space-x-10">
            <ul className="flex space-x-8 font-mono">
              {navLinks.map(({ path, label }) => (
                <li key={path}>
                  <Link
                    to={path}
                    className={`hover:text-light-pink dark:hover:text-brand-pink transition-all duration-300 hover:scale-105 ${
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
            
            {/* Command Palette Hint */}
            <button 
              onClick={() => {
                // Trigger the command palette
                const event = new KeyboardEvent('keydown', {
                  key: 'k',
                  metaKey: isMac,
                  ctrlKey: !isMac,
                  bubbles: true
                });
                document.dispatchEvent(event);
              }}
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-light-hover dark:bg-dark-surface rounded-lg border border-light-hover dark:border-dark-surface group hover:border-light-pink dark:hover:border-brand-pink transition-all duration-200"
            >
              <Search className="w-4 h-4 text-light-text-muted dark:text-dark-text-muted group-hover:text-light-pink dark:group-hover:text-brand-pink transition-colors" />
              <span className="text-xs text-light-text-muted dark:text-dark-text-muted group-hover:text-light-pink dark:group-hover:text-brand-pink transition-colors">
                Search
              </span>
              <kbd className="text-xs bg-light-card dark:bg-dark-card px-2 py-1 rounded-lg text-light-text-muted dark:text-dark-text-muted group-hover:text-light-pink dark:group-hover:text-brand-pink transition-colors">
                {isMac ? '⌘K' : 'Ctrl+K'}
              </kbd>
            </button>
            
            <button
              onClick={toggleTheme}
              className="font-mono text-sm p-3 text-light-text-secondary dark:text-dark-text-secondary hover:text-light-pink dark:hover:text-brand-pink transition-all duration-300 hover:scale-110 border border-transparent hover:border-light-hover dark:hover:border-dark-hover rounded-lg"
              aria-label="Toggle theme"
            >
              [{theme === 'light' ? 'dark' : 'light'}]
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar