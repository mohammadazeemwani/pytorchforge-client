import React from "react"
import { defaultThemeType, themeTypeToName } from "~/constants/general"
import { getSystemPreferredTheme } from "~/helpers/theme"
import type { Theme } from "~/types/theme"
type ThemeValue = {
  theme: Theme
  /** Toggles the theme from dark to light */
  toggleTheme: () => void
}
export const ThemeContext = React.createContext<ThemeValue | undefined>(
  undefined,
) // it is the initial value

type ThemeProviderProps = {
  children: React.ReactNode
}

/**
 *
 * @param param0
 * @returns There are three places to set the theme when dealing completely with client side stuff: SPA or SSG
 * - ContextState - so theme can be accessed across components > and pages in case of SSG
 * - In document.documentElement.dataset.theme - cz we are using daisyUI and it is it's way of handling theme
 * - After page refresh, theme in SPA/SSG, can be derived from the below three places
 *  1. systemPreference [flickering if systemTheme != our defaultSetTheme]
 *  2. default set by us
 *  3. We use 1. OR 2. to derive initial theme and there after store in localStorage, so after refresh the user sees the one theme in localStorage
 */
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(defaultThemeType)

  React.useEffect(() => {
    // after hydration, we will change the theme as per the system preference
    // only if the theme is not in localstore
    if (!localStorage.getItem("theme")) {
      // means the toggleTheme is not called any time cz that is what sets the theme in localstorage,
      // so it is to set the theme in localstorage for the first time,
      // and we will not just set the defaultTheme,, but update both localStorage and defaultTheme with the system theme
      const userTheme = getSystemPreferredTheme()
      localStorage.setItem("theme", userTheme)
      document.documentElement.dataset.theme = themeTypeToName[userTheme]
      setTheme(userTheme)
    } else {
      // we update with theme in localStorage
      const savedTheme = localStorage.getItem("theme") as Theme
      document.documentElement.dataset.theme = themeTypeToName[savedTheme]
      setTheme(savedTheme)
    }
  }, [])

  /** This function will update the theme globally and also update the localstorage */
  const toggleTheme = React.useCallback(() => {
    // if we have more themes, we will not have toggle, we will have a setter function and that will just set what is passed in the callback,
    // even easier

    if (theme === "dark") {
      setTheme("light")
      localStorage.setItem("theme", "light")
      document.documentElement.dataset.theme = themeTypeToName['light']
    } else {
      setTheme("dark")
      localStorage.setItem("theme", "dark")
      document.documentElement.dataset.theme = themeTypeToName['dark']
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
