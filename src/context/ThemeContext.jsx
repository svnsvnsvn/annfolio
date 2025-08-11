import { createContext, useState, useEffect, useContext } from 'react'

const ThemeContext = createContext()
const CommandPaletteContext = createContext()

export { ThemeContext, CommandPaletteContext }

// Custom hooks
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext)
  if (!context) {
    throw new Error('useCommandPalette must be used within a CommandPaletteProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage on initial load, fallback to system preference
    if (typeof window !== 'undefined') {
      let savedTheme = localStorage.getItem('theme')
      if (!savedTheme) {
        savedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      return savedTheme
    }
    return 'light'
  })

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    // Update localStorage whenever theme changes
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }

  const toggleCommandPalette = () => {
    setCommandPaletteOpen(!commandPaletteOpen)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CommandPaletteContext.Provider value={{ commandPaletteOpen, setCommandPaletteOpen, toggleCommandPalette }}>
        {children}
      </CommandPaletteContext.Provider>
    </ThemeContext.Provider>
  )
}