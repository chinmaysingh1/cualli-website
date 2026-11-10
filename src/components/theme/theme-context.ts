import { createContext } from 'react'
import type { Theme } from '@/constants/theme'

export const ThemeContext = createContext<{
  theme: Theme
  toggleTheme: () => void
} | null>(null)
