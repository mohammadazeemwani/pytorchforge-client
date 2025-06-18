import type { Theme } from "~/types/theme";

/**
 * We are not checking for any window not exist condition, 
 * This is because this function will only be called after an effect when we have our window object defined.
 */
export function getSystemPreferredTheme(): Theme {
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (systemPrefersDark) return 'dark'
    return 'light'
}

