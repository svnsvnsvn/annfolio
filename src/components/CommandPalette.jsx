import { useEffect, useState, useRef } from 'react'
import { Command } from 'cmdk'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Home, 
  FolderOpen, 
  BookOpen, 
  User, 
  Mail, 
  Github, 
  ExternalLink,
  Sun,
  Moon,
  Terminal
} from 'lucide-react'
import { useTheme, useCommandPalette } from '../context/hooks'
import { projects } from '../data/projects'

function CommandPalette() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const { commandPaletteOpen, setCommandPaletteOpen, toggleCommandPalette } = useCommandPalette()
  const inputRef = useRef(null)
  const [searchValue, setSearchValue] = useState('')
  const [showToroEasterEgg, setShowToroEasterEgg] = useState(false)

  // Check for Toro easter egg
  useEffect(() => {
    if (searchValue.toLowerCase() === 'toro') {
      setShowToroEasterEgg(true)
      // Hide after 3 seconds
      setTimeout(() => setShowToroEasterEgg(false), 3000)
    } else {
      setShowToroEasterEgg(false)
    }
  }, [searchValue])

  // Toggle command palette with keyboard shortcut
  useEffect(() => {
    const down = (e) => {
      // Debug log
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        toggleCommandPalette()
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [toggleCommandPalette, setCommandPaletteOpen])

  // Focus input when command palette opens
  useEffect(() => {
    if (commandPaletteOpen) {
      // Small delay to ensure the element is fully rendered
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus()
        }
      }, 100)
    }
  }, [commandPaletteOpen])

  const runCommand = (callback) => {
    setCommandPaletteOpen(false)
    setTimeout(() => {
      callback()
    }, 100)
  }

  const navigationItems = [
    {
      name: 'Home',
      icon: Home,
      action: () => navigate('/'),
      shortcut: 'H'
    },
    {
      name: 'Projects',
      icon: FolderOpen,
      action: () => navigate('/projects'),
      shortcut: 'P'
    },
    {
      name: 'Research',
      icon: BookOpen,
      action: () => navigate('/research'),
      shortcut: 'R'
    },
    {
      name: 'About',
      icon: User,
      action: () => navigate('/about'),
      shortcut: 'A'
    },
    {
      name: 'Contact',
      icon: Mail,
      action: () => navigate('/contact'),
      shortcut: 'C'
    }
  ]

  const themeItems = [
    {
      name: 'Toggle Theme',
      icon: theme === 'dark' ? Sun : Moon,
      action: toggleTheme,
      shortcut: 'T'
    }
  ]

  const socialItems = [
    {
      name: 'GitHub Profile',
      icon: Github,
      action: () => window.open('https://github.com/svnsvnsvn', '_blank'),
      shortcut: 'G'
    }
  ]

  // Easter egg items that appear when typing "toro"
  const toroEasterEggItems = [
    {
      name: '🐾 Hello from Toro!',
      icon: () => <img src="/toro_gifs/bits-8bits-6.gif" alt="Toro" className="w-4 h-4" style={{ imageRendering: 'pixelated' }} />,
      action: () => {
        console.log('Toro says: Meow! Thanks for finding me!')
        // You could add more fun actions here
      },
      shortcut: '🎉'
    },
    {
      name: '🎮 Toro is coding with you!',
      icon: () => <img src="/toro_gifs/bits-8bits-4.gif" alt="Coding Toro" className="w-4 h-4" style={{ imageRendering: 'pixelated' }} />,
      action: () => {
        console.log('Toro: Let\'s build something amazing together!')
      },
      shortcut: '💻'
    },
    {
      name: '✨ Secret Toro Collection',
      icon: () => <img src="/toro_gifs/bits-8bits-7.gif" alt="Happy Toro" className="w-4 h-4" style={{ imageRendering: 'pixelated' }} />,
      action: () => {
        console.log('You found all the Toro secrets! Check the footer, contact form, and about page for more Toro friends!')
      },
      shortcut: '🔍'
    }
  ]

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setCommandPaletteOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed inset-x-4 sm:inset-x-auto sm:left-1/2 sm:transform sm:-translate-x-1/2 top-[10%] sm:top-[20%] w-auto sm:w-full max-w-lg sm:mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Command className="bg-light-card dark:bg-dark-card border border-light-hover dark:border-dark-surface rounded-lg shadow-2xl overflow-hidden font-mono">
              <div className="flex items-center border-b border-light-hover dark:border-dark-surface px-3 sm:px-4">
                <Terminal className="w-4 h-4 text-light-text-muted dark:text-dark-text-muted mr-2" />
                <Command.Input
                  ref={inputRef}
                  value={searchValue}
                  onValueChange={setSearchValue}
                  placeholder="Type a command..."
                  className="flex-1 bg-transparent py-3 px-2 text-sm sm:text-base text-light-text-primary dark:text-dark-text-primary placeholder:text-light-text-muted dark:placeholder:text-dark-text-muted outline-none"
                />
                <kbd className="hidden sm:inline-block px-2 py-1 text-xs text-light-text-muted dark:text-dark-text-muted bg-light-hover dark:bg-dark-surface rounded-lg">
                  ESC
                </kbd>
              </div>
              
              <Command.List className="max-h-60 sm:max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-4 sm:py-6 text-center text-sm text-light-text-muted dark:text-dark-text-muted">
                  No results found.
                </Command.Empty>

                {/* Easter Egg - Toro Items */}
                {showToroEasterEgg && (
                  <Command.Group heading="🎉 Toro Easter Egg!" className="px-2 text-light-pink dark:text-brand-pink text-xs font-medium mb-2">
                    {toroEasterEggItems.map((item) => (
                      <Command.Item
                        key={item.name}
                        value={item.name.toLowerCase()}
                        onSelect={() => runCommand(item.action)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-lg hover:bg-light-hover dark:hover:bg-dark-surface cursor-pointer data-[selected=true]:bg-light-hover dark:data-[selected=true]:bg-dark-surface"
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="flex-1">{item.name}</span>
                        <span className="text-xs bg-light-pink/20 dark:bg-brand-pink/20 text-light-pink dark:text-brand-pink px-2 py-1 rounded-lg">
                          {item.shortcut}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Featured Projects */}
                {projects.length > 0 && (
                  <Command.Group heading="Featured Projects" className="px-2 text-light-text-muted dark:text-dark-text-muted text-xs font-medium mb-2">
                    {projects.slice(0, 4).map((project, index) => (
                      <Command.Item
                        key={project.id}
                        value={project.title.toLowerCase()}
                        onSelect={() => runCommand(() => {
                          if (project.github) {
                            window.open(project.github, '_blank')
                          } else {
                            console.log(`No GitHub link available for ${project.title}`)
                          }
                        })}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-lg hover:bg-light-hover dark:hover:bg-dark-surface cursor-pointer data-[selected=true]:bg-light-hover dark:data-[selected=true]:bg-dark-surface"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span className="flex-1 truncate">{project.title}</span>
                        <span className="text-xs bg-light-pink/20 dark:bg-brand-pink/20 text-light-pink dark:text-brand-pink px-2 py-1 rounded-lg">
                          ⌘{index + 1}
                        </span>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                {/* Navigation */}
                <Command.Group heading="Navigation" className="px-2 text-light-text-muted dark:text-dark-text-muted text-xs font-medium mb-2">
                  {navigationItems.map((item) => (
                    <Command.Item
                      key={item.name}
                      value={item.name.toLowerCase()}
                      onSelect={() => runCommand(item.action)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-lg hover:bg-light-hover dark:hover:bg-dark-surface cursor-pointer data-[selected=true]:bg-light-hover dark:data-[selected=true]:bg-dark-surface"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.name}</span>
                      <kbd className="text-xs bg-light-blue/20 dark:bg-brand-blue/20 text-light-blue dark:text-brand-blue px-2 py-1 rounded-lg">
                        {item.shortcut}
                      </kbd>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Theme */}
                <Command.Group heading="Theme" className="px-2 text-light-text-muted dark:text-dark-text-muted text-xs font-medium mb-2">
                  {themeItems.map((item) => (
                    <Command.Item
                      key={item.name}
                      value={item.name.toLowerCase()}
                      onSelect={() => runCommand(item.action)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-lg hover:bg-light-hover dark:hover:bg-dark-surface cursor-pointer data-[selected=true]:bg-light-hover dark:data-[selected=true]:bg-dark-surface"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.name}</span>
                      <kbd className="text-xs bg-light-blue/20 dark:bg-brand-blue/20 text-light-blue dark:text-brand-blue px-2 py-1 rounded-lg">
                        {item.shortcut}
                      </kbd>
                    </Command.Item>
                  ))}
                </Command.Group>

                {/* Social */}
                <Command.Group heading="Social" className="px-2 text-light-text-muted dark:text-dark-text-muted text-xs font-medium mb-2">
                  {socialItems.map((item) => (
                    <Command.Item
                      key={item.name}
                      value={item.name.toLowerCase()}
                      onSelect={() => runCommand(item.action)}
                      className="flex items-center gap-3 px-3 py-2 text-sm text-light-text-secondary dark:text-dark-text-secondary rounded-lg hover:bg-light-hover dark:hover:bg-dark-surface cursor-pointer data-[selected=true]:bg-light-hover dark:data-[selected=true]:bg-dark-surface"
                    >
                      <item.icon className="h-4 w-4" />
                      <span className="flex-1">{item.name}</span>
                      <kbd className="text-xs bg-light-blue/20 dark:bg-brand-blue/20 text-light-blue dark:text-brand-blue px-2 py-1 rounded-lg">
                        {item.shortcut}
                      </kbd>
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
