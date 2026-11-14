import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ThemeContext } from '@/components/theme/theme-context'
import { themeStorageKey, type Theme } from '@/constants/theme'

function readPreference(): Theme | null {
  try {
    const stored = localStorage.getItem(themeStorageKey)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.style.colorScheme = theme
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'dark' ? '#000000' : '#FFFFFF')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  // The head script applies the saved/system theme before the first paint.
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  )
  const preference = useRef<Theme | null>(readPreference())

  useEffect(() => {
    const system = window.matchMedia('(prefers-color-scheme: dark)')
    const sync = () => {
      const next = preference.current ?? (system.matches ? 'dark' : 'light')
      applyTheme(next)
      setTheme(next)
    }
    const onSystemChange = () => {
      if (preference.current === null) sync()
    }
    const onStorageChange = (event: StorageEvent) => {
      if (event.key !== themeStorageKey && event.key !== null) return
      preference.current = readPreference()
      sync()
    }
    system.addEventListener('change', onSystemChange)
    window.addEventListener('storage', onStorageChange)
    return () => {
      system.removeEventListener('change', onSystemChange)
      window.removeEventListener('storage', onStorageChange)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    preference.current = next
    applyTheme(next)
    setTheme(next)
    try {
      localStorage.setItem(themeStorageKey, next)
    } catch {
      // Keep the user's selection for this visit when storage is unavailable.
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
