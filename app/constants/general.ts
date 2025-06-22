import type { Theme } from "~/types/theme"

export const defaultThemeType: Theme = "light"

/**
 *  Make sure that the named themes are defined in app.css with daisyUI configuration 
 *  @usage use for docuemnt -> html setting. For other places, reference of light and dark is just OK.
*/
export const themeTypeToName: Record<Theme, string> = {
  light: "retro",
  dark: 'coffee'
}

export const applicationVersion = '1.0.1'
