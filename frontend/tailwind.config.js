/**
 * tailwind.config.js
 *
 * ALL colours point to CSS custom properties defined in main.css and
 * written at runtime by userPrefs.js → applyAll().
 * This means accent changes, dark mode, and high-contrast all flow
 * through a single mechanism with zero duplication.
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}"
  ],
  darkMode: "class",   // <html class="dark"> toggled by userPrefs.applyAll()
  theme: {
    extend: {
      colors: {
        // ── Accent (dynamic via CSS vars) ──────────────────────────────
        "primary":                    "var(--color-primary)",
        "primary-dim":                "var(--color-primary-dim)",
        "primary-fixed":              "var(--color-primary-fixed)",
        "primary-fixed-dim":          "var(--color-primary-fixed-dim)",
        "on-primary":                 "var(--color-on-primary)",
        "primary-container":          "var(--color-primary-container)",
        "on-primary-container":       "var(--color-on-primary-container)",

        "secondary":                  "var(--color-secondary)",
        "secondary-container":        "var(--color-secondary-container)",
        "on-secondary-container":     "var(--color-on-secondary-container)",

        "tertiary":                   "var(--color-tertiary)",
        "tertiary-container":         "var(--color-tertiary-container)",
        "on-tertiary-container":      "var(--color-on-tertiary-container)",
        "tertiary-fixed-dim":         "var(--color-tertiary-fixed-dim)",

        // ── Surfaces (dynamic via CSS vars) ────────────────────────────
        "background":                 "var(--color-background)",
        "on-background":              "var(--color-on-background)",
        "surface":                    "var(--color-surface)",
        "surface-dim":                "var(--color-surface-dim)",
        "surface-bright":             "var(--color-surface-bright)",
        "surface-variant":            "var(--color-surface-variant)",
        "on-surface":                 "var(--color-on-surface)",
        "on-surface-variant":         "var(--color-on-surface-variant)",
        "inverse-surface":            "var(--color-inverse-surface)",
        "surface-container-lowest":   "var(--color-surface-container-lowest)",
        "surface-container-low":      "var(--color-surface-container-low)",
        "surface-container":          "var(--color-surface-container)",
        "surface-container-high":     "var(--color-surface-container-high)",
        "surface-container-highest":  "var(--color-surface-container-highest)",
        "outline":                    "var(--color-outline)",
        "outline-variant":            "var(--color-outline-variant)",

        // ── Error (static) ─────────────────────────────────────────────
        "error":                      "var(--color-error)",
        "error-dim":                  "var(--color-error-dim)",
        "on-error":                   "var(--color-on-error)",

        // ── Kept for any legacy classes not yet migrated ────────────────
        "secondary-fixed":            "#d3e4ff",
        "secondary-fixed-dim":        "#86b7f3",
        "on-secondary":               "#ffffff",
        "tertiary-fixed":             "#d6e6f9",
        "on-tertiary":                "#ffffff",
        "on-tertiary-fixed":          "#002a4a",
        "on-tertiary-fixed-variant":  "#00325b",
        "secondary-dim":              "#1153a1",
        "on-primary-fixed":           "#001b3d",
        "on-primary-fixed-variant":   "#00478a",
        "inverse-on-surface":         "#f0f0f3",
        "inverse-primary":            "#d3e4ff",
        "surface-tint":               "var(--color-primary)",
        "error-container":            "#f95630",
        "on-error-container":         "#520c00",
      },
      fontFamily: {
        "headline": ["Inter"],
        "body":     ["Inter"],
        "label":    ["Inter"],
      },
      borderRadius: {
        "DEFAULT": "4px",
        "lg":      "8px",
        "xl":      "12px",
        "full":    "9999px",
      },
      screens: {
        'xs':  '480px',
        'sm':  '640px',
        'md':  '768px',
        'lg':  '1024px',
        'xl':  '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
