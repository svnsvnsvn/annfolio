import { useState, useEffect } from 'react'

function Footer() {
  const [currentToroGif, setCurrentToroGif] = useState(0)
  
  const toroGifs = [
    '/toro_gifs/bits-8bits.gif',
    '/toro_gifs/bits-8bits-2.gif',
    '/toro_gifs/bits-8bits-3.gif',
    '/toro_gifs/bits-8bits-4.gif',
    '/toro_gifs/bits-8bits-5.gif',
    '/toro_gifs/bits-8bits-6.gif',
    '/toro_gifs/bits-8bits-7.gif'
  ]

  // Cycle through Toro GIFs slowly
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentToroGif((prev) => (prev + 1) % toroGifs.length)
    }, 4000) // Change every 4 seconds
    
    return () => clearInterval(interval)
  }, [toroGifs.length])

  const links = [
    { name: 'GitHub', url: 'https://github.com/svnsvnsvn' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/helloworld7/' },
    // { name: 'Twitter', url: '#' }
  ]

  return (
    <footer className="bg-light-surface dark:bg-dark-surface border-t border-light-hover dark:border-dark-surface py-8 mt-12 font-mono transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center relative">
          {/* Toro Footer Friend */}
          <div className="absolute left-0 top-0 md:relative md:left-auto md:top-auto mb-4 md:mb-0">
            <img 
              src={toroGifs[currentToroGif]} 
              alt="Toro companion" 
              className="w-8 h-8 md:w-10 md:h-10 opacity-70 hover:opacity-100 transition-opacity duration-300"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          
          <p className="mb-4 md:mb-0 text-light-text-muted dark:text-dark-text-muted text-sm">
             © 2025 svnsvnsvn. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            {links.map((link, index) => (
              <span key={link.name}>
                <a 
                  href={link.url} 
                  className="text-light-text-secondary dark:text-dark-text-secondary hover:text-light-pink dark:hover:text-brand-pink transition-colors"
                >
                  {link.name}
                </a>
                {index < links.length - 1 && 
                  <span className="text-light-text-muted dark:text-dark-text-muted ml-6">|</span>
                }
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer