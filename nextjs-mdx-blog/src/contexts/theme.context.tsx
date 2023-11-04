/* eslint-disable @typescript-eslint/no-empty-function */
import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react'

type ContextType = {
  toggleDark: () => void
  isDark: boolean
}

const defaultContext: ContextType = {
  toggleDark: () => {
    console.warn('Should have been overriden')
  },
  isDark: true,
}

export const ThemeContext = createContext(defaultContext)

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const lsDark = JSON.parse(localStorage.getItem('ThemeContext:isDark'))
    if (lsDark !== undefined && lsDark !== null) {
      setIsDark(lsDark)
    } else if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      setIsDark(false)
    }
  }, [])

  const context: ContextType = useMemo(() => {
    return {
      toggleDark: () => {
        localStorage.setItem('ThemeContext:isDark', String(!isDark))
        setIsDark(!isDark)
      },
      isDark,
    }
  }, [isDark, setIsDark])

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  )
}
