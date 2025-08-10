import { useContext } from 'react'
import { ThemeContext, CommandPaletteContext } from './ThemeContext'

export const useTheme = () => useContext(ThemeContext)
export const useCommandPalette = () => useContext(CommandPaletteContext)
