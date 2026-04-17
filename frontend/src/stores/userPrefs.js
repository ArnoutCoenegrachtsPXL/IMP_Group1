import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useUserPrefsStore = defineStore('userPrefs', () => {
  // ── State ──────────────────────────────────────────────────
  const theme       = ref(localStorage.getItem('ep-theme')       || 'blue')
  const darkMode    = ref(localStorage.getItem('ep-dark')        === 'true')
  const fontSize    = ref(Number(localStorage.getItem('ep-font-size')) || 16)
  const highContrast= ref(localStorage.getItem('ep-hc')          === 'true')
  const reduceMotion= ref(localStorage.getItem('ep-motion')      === 'true')
  const language    = ref(localStorage.getItem('ep-lang')        || 'en')
  const energyUnit  = ref(localStorage.getItem('ep-unit')        || 'kWh')
  const sidebarOpen = ref(true)

  // ── Theme colour map ───────────────────────────────────────
  const themes = {
    blue:   { '--pri': '#1565C0', '--pri-mid': '#1978E5', '--pri-light': '#E3F0FF', '--pri-hover': '#0D47A1' },
    teal:   { '--pri': '#0D6E5F', '--pri-mid': '#0F9B84', '--pri-light': '#D7F5F0', '--pri-hover': '#095A4E' },
    violet: { '--pri': '#6D28D9', '--pri-mid': '#7C3AED', '--pri-light': '#EDE9FE', '--pri-hover': '#5B21B6' },
    orange: { '--pri': '#B45309', '--pri-mid': '#C2410C', '--pri-light': '#FEF3C7', '--pri-hover': '#92400E' },
    cyan:   { '--pri': '#0E7490', '--pri-mid': '#0891B2', '--pri-light': '#CFFAFE', '--pri-hover': '#0C5F75' },
  }

  // ── Apply all prefs to <html> ──────────────────────────────
  function applyAll() {
    const html = document.documentElement

    // Font size
    html.style.fontSize = fontSize.value + 'px'

    // Dark mode
    html.classList.toggle('dark', darkMode.value)

    // High contrast
    html.classList.toggle('high-contrast', highContrast.value)

    // Reduce motion
    html.classList.toggle('reduce-motion', reduceMotion.value)

    // Theme colours
    const t = themes[theme.value] || themes.blue
    for (const [k, v] of Object.entries(t)) {
      html.style.setProperty(k, v)
    }

    // RTL languages
    const rtlLangs = ['ar', 'he', 'fa', 'ur']
    html.setAttribute('dir', rtlLangs.includes(language.value) ? 'rtl' : 'ltr')
    html.setAttribute('lang', language.value)
  }

  // ── Setters ────────────────────────────────────────────────
  function setTheme(t) {
    theme.value = t
    localStorage.setItem('ep-theme', t)
    applyAll()
  }
  function setDarkMode(v) {
    darkMode.value = v
    localStorage.setItem('ep-dark', v)
    applyAll()
  }
  function setFontSize(v) {
    fontSize.value = v
    localStorage.setItem('ep-font-size', v)
    applyAll()
  }
  function setHighContrast(v) {
    highContrast.value = v
    localStorage.setItem('ep-hc', v)
    applyAll()
  }
  function setReduceMotion(v) {
    reduceMotion.value = v
    localStorage.setItem('ep-motion', v)
    applyAll()
  }
  function setLanguage(v) {
    language.value = v
    localStorage.setItem('ep-lang', v)
    applyAll()
  }
  function setEnergyUnit(v) {
    energyUnit.value = v
    localStorage.setItem('ep-unit', v)
  }
  function toggleSidebar() {
    sidebarOpen.value = !sidebarOpen.value
  }

  // ── Init on first load ─────────────────────────────────────
  applyAll()

  return {
    theme, darkMode, fontSize, highContrast, reduceMotion,
    language, energyUnit, sidebarOpen, themes,
    setTheme, setDarkMode, setFontSize, setHighContrast,
    setReduceMotion, setLanguage, setEnergyUnit, toggleSidebar, applyAll
  }
})
