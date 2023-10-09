import { currentTheme } from '$lib/stores'

export function enableSystemMode() {
  currentTheme.set('system')
  localStorage.removeItem('dark-mode')
  window.matchMedia('(prefers-color-scheme: dark)').matches
    ? document.documentElement.classList.add('dark')
    : document.documentElement.classList.remove('dark')
}

export function enableDarkMode() {
  currentTheme.set('enabled')
  document.documentElement.classList.add('dark')
  localStorage.setItem('dark-mode', 'enabled')
}

export function enableLightMode() {
  currentTheme.set('disabled')
  document.documentElement.classList.remove('dark')
  localStorage.setItem('dark-mode', 'disabled')
}

export function getThemeValue() {
  const currentThemeValue = localStorage.getItem('dark-mode')
    ? (localStorage.getItem('dark-mode') as string)
    : 'system'

  if (currentThemeValue === 'enabled') currentTheme.set('enabled')
  else if (currentThemeValue === 'disabled') currentTheme.set('disabled')
  else if (currentThemeValue === 'system') currentTheme.set('system')
}

export function initThemeValue() {
  const currentThemeValue = localStorage.getItem('dark-mode')
    ? (localStorage.getItem('dark-mode') as string)
    : 'system'

  // darkMode
  if (currentThemeValue === 'enabled') {
    document.documentElement.classList.add('dark')
    localStorage.setItem('dark-mode', 'enabled')

    // lightMode
  } else if (currentThemeValue === 'disabled') {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('dark-mode', 'disabled')

    // systemMode
  } else if (currentThemeValue === 'system') {
    localStorage.removeItem('dark-mode')
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark')
  }
}
