/**
 * userPrefs.js — Single source of truth for ALL user preferences.
 *
 * HOW IT WORKS
 * ─────────────
 * 1. Every preference is stored in localStorage with an "ep-" prefix.
 * 2. applyAll() writes CSS variables to <html> AND toggles class names.
 *    • <html class="dark">         → enables Tailwind dark: variants
 *    • <html class="high-contrast">→ enables HC CSS overrides
 *    • <html class="reduce-motion">→ disables all animations
 *    • <html dir="rtl/ltr">        → flips layout for RTL languages
 * 3. Tailwind's theme config (index.html) maps color tokens to var(--color-*)
 *    so changes are instant across every component.
 */
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// ─── Accent colour palettes ──────────────────────────────────────────────────
const ACCENT_PALETTES = {
  blue: {
    '--color-primary':                '#1978e5',
    '--color-primary-dim':            '#1565c0',
    '--color-primary-fixed':          '#d3e4ff',
    '--color-primary-fixed-dim':      '#86b7f3',
    '--color-on-primary':             '#ffffff',
    '--color-primary-container':      '#d3e4ff',
    '--color-on-primary-container':   '#001b3d',
    '--color-secondary':              '#1978e5',
    '--color-secondary-container':    '#d3e4ff',
    '--color-on-secondary-container': '#001b3d',
    '--color-tertiary':               '#1978e5',
    '--color-tertiary-container':     '#d6e6f9',
    '--color-on-tertiary-container':  '#001e30',
    '--pri':       '#1565C0',
    '--pri-mid':   '#1978E5',
    '--pri-light': '#E3F0FF',
    '--pri-hover': '#0D47A1',
  },
  teal: {
    '--color-primary':                '#0f9b84',
    '--color-primary-dim':            '#0d6e5f',
    '--color-primary-fixed':          '#d7f5f0',
    '--color-primary-fixed-dim':      '#7ddfd1',
    '--color-on-primary':             '#ffffff',
    '--color-primary-container':      '#d7f5f0',
    '--color-on-primary-container':   '#002018',
    '--color-secondary':              '#0f9b84',
    '--color-secondary-container':    '#d7f5f0',
    '--color-on-secondary-container': '#002018',
    '--color-tertiary':               '#0f9b84',
    '--color-tertiary-container':     '#d7f5f0',
    '--color-on-tertiary-container':  '#002018',
    '--pri':       '#0D6E5F',
    '--pri-mid':   '#0F9B84',
    '--pri-light': '#D7F5F0',
    '--pri-hover': '#095A4E',
  },
  violet: {
    '--color-primary':                '#7c3aed',
    '--color-primary-dim':            '#6d28d9',
    '--color-primary-fixed':          '#ede9fe',
    '--color-primary-fixed-dim':      '#c4b5fd',
    '--color-on-primary':             '#ffffff',
    '--color-primary-container':      '#ede9fe',
    '--color-on-primary-container':   '#2e1065',
    '--color-secondary':              '#7c3aed',
    '--color-secondary-container':    '#ede9fe',
    '--color-on-secondary-container': '#2e1065',
    '--color-tertiary':               '#7c3aed',
    '--color-tertiary-container':     '#ede9fe',
    '--color-on-tertiary-container':  '#2e1065',
    '--pri':       '#6D28D9',
    '--pri-mid':   '#7C3AED',
    '--pri-light': '#EDE9FE',
    '--pri-hover': '#5B21B6',
  },
  amber: {
    '--color-primary':                '#c2410c',
    '--color-primary-dim':            '#b45309',
    '--color-primary-fixed':          '#fef3c7',
    '--color-primary-fixed-dim':      '#fbbf24',
    '--color-on-primary':             '#ffffff',
    '--color-primary-container':      '#fef3c7',
    '--color-on-primary-container':   '#451a03',
    '--color-secondary':              '#c2410c',
    '--color-secondary-container':    '#fef3c7',
    '--color-on-secondary-container': '#451a03',
    '--color-tertiary':               '#c2410c',
    '--color-tertiary-container':     '#fef3c7',
    '--color-on-tertiary-container':  '#451a03',
    '--pri':       '#B45309',
    '--pri-mid':   '#C2410C',
    '--pri-light': '#FEF3C7',
    '--pri-hover': '#92400E',
  },
  rose: {
    '--color-primary':                '#e11d48',
    '--color-primary-dim':            '#be123c',
    '--color-primary-fixed':          '#ffe4e6',
    '--color-primary-fixed-dim':      '#fda4af',
    '--color-on-primary':             '#ffffff',
    '--color-primary-container':      '#ffe4e6',
    '--color-on-primary-container':   '#4c0519',
    '--color-secondary':              '#e11d48',
    '--color-secondary-container':    '#ffe4e6',
    '--color-on-secondary-container': '#4c0519',
    '--color-tertiary':               '#e11d48',
    '--color-tertiary-container':     '#ffe4e6',
    '--color-on-tertiary-container':  '#4c0519',
    '--pri':       '#BE123C',
    '--pri-mid':   '#E11D48',
    '--pri-light': '#FFE4E6',
    '--pri-hover': '#9F1239',
  },
}

// ─── Surface tokens ──────────────────────────────────────────────────────────
const DARK_SURFACES = {
  '--color-background':               '#0f1318',
  '--color-on-background':            '#e2e2e5',
  '--color-surface':                  '#0f1318',
  '--color-surface-dim':              '#0f1318',
  '--color-surface-bright':           '#353a40',
  '--color-surface-variant':          '#44474e',
  '--color-on-surface':               '#e2e2e5',
  '--color-on-surface-variant':       '#c4c7cf',
  '--color-inverse-surface':          '#e2e2e5',
  '--color-surface-container-lowest': '#0a0e14',
  '--color-surface-container-low':    '#181c22',
  '--color-surface-container':        '#1c2028',
  '--color-surface-container-high':   '#26292f',
  '--color-surface-container-highest':'#313439',
  '--color-outline':                  '#8e9099',
  '--color-outline-variant':          '#44474e',
  '--surf':      '#131920',
  '--surf-2':    '#1c2330',
  '--surf-3':    '#232d3a',
  '--surf-card': '#1a2233',
  '--text':      '#e2e8f0',
  '--text-muted':'#94a3b8',
  '--border':        'rgba(255,255,255,0.08)',
  '--border-strong': 'rgba(255,255,255,0.16)',
}

const LIGHT_SURFACES = {
  '--color-background':               '#f8fbff',
  '--color-on-background':            '#1a1c1e',
  '--color-surface':                  '#f8fbff',
  '--color-surface-dim':              '#d8e1e9',
  '--color-surface-bright':           '#f8fbff',
  '--color-surface-variant':          '#dfe2eb',
  '--color-on-surface':               '#1a1c1e',
  '--color-on-surface-variant':       '#44474e',
  '--color-inverse-surface':          '#0a111a',
  '--color-surface-container-lowest': '#ffffff',
  '--color-surface-container-low':    '#f0f5fa',
  '--color-surface-container':        '#eef2f6',
  '--color-surface-container-high':   '#e1edf9',
  '--color-surface-container-highest':'#dce4eb',
  '--color-outline':                  '#717882',
  '--color-outline-variant':          '#cad4e0',
  '--surf':      '#F6FAFE',
  '--surf-2':    '#EBF3FD',
  '--surf-3':    '#DDEAF8',
  '--surf-card': '#FFFFFF',
  '--text':      '#0D1B2A',
  '--text-muted':'#5A7084',
  '--border':        'rgba(25,120,229,0.14)',
  '--border-strong': 'rgba(25,120,229,0.30)',
}

// ─── High-contrast overrides ─────────────────────────────────────────────────
const HC_LIGHT = {
  '--color-on-surface':         '#000000',
  '--color-on-background':      '#000000',
  '--color-on-surface-variant': '#111111',
  '--color-outline':            '#000000',
  '--color-outline-variant':    '#333333',
  '--text':                     '#000000',
  '--text-muted':               '#333333',
}
const HC_DARK = {
  '--color-on-surface':         '#ffffff',
  '--color-on-background':      '#ffffff',
  '--color-on-surface-variant': '#eeeeee',
  '--color-outline':            '#ffffff',
  '--color-outline-variant':    '#cccccc',
  '--text':                     '#ffffff',
  '--text-muted':               '#cccccc',
}

// ─── Translation strings ──────────────────────────────────────────────────────
export const TRANSLATIONS = {
  en: {
    // Navigation
    dashboard: 'Dashboard', leaderboard: 'Leaderboard', uploadMeter: 'Upload Meter',
    energyLab: 'Energy Lab', community: 'Community', settings: 'Settings',
    support: 'Support', logout: 'Logout', search: 'Search…',
    viewImpactReport: 'View Impact Report',
    // Settings page
    settingsTitle: 'Settings',
    settingsSubtitle: 'Manage your account preferences, appearance, notifications, and privacy.',
    appearance: 'Appearance', notifications: 'Notifications',
    privacyData: 'Privacy & Data', energyPrefs: 'Energy Preferences',
    languageRegion: 'Language & Region', security: 'Security', dangerZone: 'Danger Zone',
    colorMode: 'Color Mode', light: 'Light', dark: 'Dark', system: 'System',
    accentColor: 'Accent Color', textSize: 'Text Size',
    small: 'Small', medium: 'Medium', large: 'Large', xlarge: 'X-Large',
    accessibility: 'Accessibility',
    highContrast: 'High Contrast', highContrastDesc: 'Increase text contrast for legibility',
    reduceMotion: 'Reduce Motion', reduceMotionDesc: 'Minimise animations and transitions',
    saveAllChanges: 'Save All Changes', settingsSaved: 'Settings saved!',
    resetSettings: 'Reset All Settings', resetSettingsDesc: 'Restore all preferences to their defaults',
    deleteAccount: 'Delete Account', deleteAccountDesc: 'Permanently delete your account and all data',
    // Notifications
    emailAlerts: 'Email Alerts', emailAlertsDesc: 'Receive critical alerts via email',
    pushAlerts: 'Push Notifications', pushAlertsDesc: 'Browser & mobile push notifications',
    weeklyReport: 'Weekly Report', weeklyReportDesc: 'Weekly energy summary digest',
    communityPosts: 'Community Posts', communityPostsDesc: 'Activity from your neighbourhood',
    priceAlerts: 'Price Alerts', priceAlertsDesc: 'Alerts when energy tariffs change',
    maintenanceTips: 'Maintenance Tips', maintenanceTipsDesc: 'Energy efficiency tips and reminders',
    // Privacy
    privacyControl: 'Control how your data is shared and used.',
    shareMetrics: 'Share Metrics', shareMetricsDesc: 'Share anonymised energy data with researchers',
    publicLeaderboard: 'Public Leaderboard', publicLeaderboardDesc: 'Show your name on community leaderboards',
    usageAnalytics: 'Usage Analytics', usageAnalyticsDesc: 'Help improve the app with usage analytics',
    downloadMyData: 'Download My Data', privacyPolicy: 'Privacy Policy',
    // Energy
    autoOffsetSurplus: 'Auto Offset Surplus', autoOffsetSurplusDesc: 'Redirect surplus solar to the grid automatically',
    communitySharing: 'Community Sharing', communitySharingDesc: 'Share metrics with your neighbourhood',
    smartScheduling: 'Smart Scheduling', smartSchedulingDesc: 'AI-optimised device scheduling',
    evCharging: 'EV Off-Peak Charging', evChargingDesc: 'Charge EV during off-peak hours only',
    offPeakWindow: 'Off-Peak Window', start: 'Start', end: 'End',
    // Security
    changePassword: 'Change Password',
    currentPassword: 'Current Password', newPassword: 'New Password', confirmPassword: 'Confirm Password',
    updatePassword: 'Update Password', passwordMatch: '✓ Passwords match', passwordMismatch: 'Passwords do not match',
    twoFactor: 'Two-Factor Authentication', twoFactorDesc: 'Extra layer of account security',
    // Region
    regionNote: 'Changes apply instantly across the whole app. RTL languages flip the layout automatically.',
    language: 'Language', timeZone: 'Time Zone', currency: 'Currency', unitSystem: 'Unit System',
    languageLive: 'Interface language is now:', rtlActive: '(RTL layout active)',
    metric: 'Metric (kWh, km)', imperial: 'Imperial (mi)',
  },
  af: {
    dashboard: 'Paneelbord', leaderboard: 'Ranglys', uploadMeter: 'Laai Meter Op',
    energyLab: 'Energielab', community: 'Gemeenskap', settings: 'Instellings',
    support: 'Ondersteuning', logout: 'Meld af', search: 'Soek…',
    viewImpactReport: 'Bekyk Impakverslag',
    settingsTitle: 'Instellings',
    settingsSubtitle: 'Bestuur jou voorkeure, voorkoms, kennisgewings en privaatheid.',
    appearance: 'Voorkoms', notifications: 'Kennisgewings',
    privacyData: 'Privaatheid & Data', energyPrefs: 'Energievoorkeure',
    languageRegion: 'Taal & Streek', security: 'Sekuriteit', dangerZone: 'Gevaarsone',
    colorMode: 'Kleurmodus', light: 'Lig', dark: 'Donker', system: 'Stelsel',
    accentColor: 'Aksentkleur', textSize: 'Teksgrootte',
    small: 'Klein', medium: 'Medium', large: 'Groot', xlarge: 'Ekstra Groot',
    accessibility: 'Toeganklikheid',
    highContrast: 'Hoë Kontras', highContrastDesc: 'Vergroot tekskontrast vir leesbaarheid',
    reduceMotion: 'Verminder Beweging', reduceMotionDesc: 'Minimeer animasies en oorgange',
    saveAllChanges: 'Stoor Alle Veranderinge', settingsSaved: 'Instellings gestoor!',
    resetSettings: 'Herstel Alle Instellings', resetSettingsDesc: 'Herstel alle voorkeure na verstekwaardes',
    deleteAccount: 'Vee Rekening Uit', deleteAccountDesc: 'Verwyder jou rekening en alle data permanent',
    emailAlerts: 'E-pos Waarskuwings', emailAlertsDesc: 'Ontvang kritieke waarskuwings per e-pos',
    pushAlerts: 'Stootkennisgewings', pushAlertsDesc: 'Blaaier- en mobiele stootkennisgewings',
    weeklyReport: 'Weeklikse Verslag', weeklyReportDesc: 'Weeklikse energieopsomming',
    communityPosts: 'Gemeenskapsberigte', communityPostsDesc: 'Aktiwiteit van jou wyk',
    priceAlerts: 'Pryswaarskuwings', priceAlertsDesc: 'Waarskuwings wanneer energietariewe verander',
    maintenanceTips: 'Onderhoudswenke', maintenanceTipsDesc: 'Energiedoeltreffendheidswenke',
    privacyControl: 'Beheer hoe jou data gedeel en gebruik word.',
    shareMetrics: 'Deel Statistieke', shareMetricsDesc: 'Deel geanonimiseerde data met navorsers',
    publicLeaderboard: 'Openbare Ranglys', publicLeaderboardDesc: 'Wys jou naam op gemeenskapsranklyste',
    usageAnalytics: 'Gebruiksanalise', usageAnalyticsDesc: 'Help om die program te verbeter',
    downloadMyData: 'Laai My Data Af', privacyPolicy: 'Privaatheidsbeleid',
    autoOffsetSurplus: 'Outo-Verreken Surplus', autoOffsetSurplusDesc: 'Stuur surplus sonkrag na die netwerk',
    communitySharing: 'Gemeenskapsdeling', communitySharingDesc: 'Deel statistieke met jou wyk',
    smartScheduling: 'Slim Skedule', smartSchedulingDesc: 'KI-geoptimaliseerde toestelskedule',
    evCharging: 'EV Buitepieklaaing', evChargingDesc: 'Laai EV net tydens buitepiektye',
    offPeakWindow: 'Buitepiektydvenster', start: 'Begin', end: 'Einde',
    changePassword: 'Verander Wagwoord',
    currentPassword: 'Huidige Wagwoord', newPassword: 'Nuwe Wagwoord', confirmPassword: 'Bevestig Wagwoord',
    updatePassword: 'Dateer Wagwoord Op', passwordMatch: '✓ Wagwoorde stem ooreen', passwordMismatch: 'Wagwoorde stem nie ooreen nie',
    twoFactor: 'Twee-Faktor-Verifikasie', twoFactorDesc: 'Ekstra laag van rekeningsekuriteit',
    regionNote: 'Veranderinge geld onmiddellik deur die hele program.',
    language: 'Taal', timeZone: 'Tydsone', currency: 'Geldeenheid', unitSystem: 'Eenheidstelsel',
    languageLive: 'Koppelvlaktaal is nou:', rtlActive: '(RTL uitleg aktief)',
    metric: 'Metriek (kWh, km)', imperial: 'Imperiaal (myl)',
  },
  fr: {
    dashboard: 'Tableau de bord', leaderboard: 'Classement', uploadMeter: 'Télécharger relevé',
    energyLab: 'Laboratoire énergie', community: 'Communauté', settings: 'Paramètres',
    support: 'Support', logout: 'Déconnexion', search: 'Rechercher…',
    viewImpactReport: "Voir le rapport d'impact",
    settingsTitle: 'Paramètres',
    settingsSubtitle: 'Gérez vos préférences, apparence, notifications et confidentialité.',
    appearance: 'Apparence', notifications: 'Notifications',
    privacyData: 'Confidentialité & Données', energyPrefs: 'Préférences énergie',
    languageRegion: 'Langue & Région', security: 'Sécurité', dangerZone: 'Zone dangereuse',
    colorMode: 'Mode couleur', light: 'Clair', dark: 'Sombre', system: 'Système',
    accentColor: "Couleur d'accent", textSize: 'Taille du texte',
    small: 'Petit', medium: 'Moyen', large: 'Grand', xlarge: 'Très grand',
    accessibility: 'Accessibilité',
    highContrast: 'Contraste élevé', highContrastDesc: 'Augmenter le contraste pour la lisibilité',
    reduceMotion: 'Réduire les animations', reduceMotionDesc: 'Minimiser les animations et transitions',
    saveAllChanges: 'Enregistrer tout', settingsSaved: 'Paramètres enregistrés!',
    resetSettings: 'Réinitialiser tout', resetSettingsDesc: 'Rétablir les préférences par défaut',
    deleteAccount: 'Supprimer le compte', deleteAccountDesc: 'Supprimer définitivement votre compte et données',
    emailAlerts: 'Alertes e-mail', emailAlertsDesc: 'Recevoir des alertes critiques par e-mail',
    pushAlerts: 'Notifications push', pushAlertsDesc: 'Notifications push navigateur et mobile',
    weeklyReport: 'Rapport hebdomadaire', weeklyReportDesc: 'Résumé hebdomadaire de l\'énergie',
    communityPosts: 'Publications communautaires', communityPostsDesc: 'Activité de votre quartier',
    priceAlerts: 'Alertes de prix', priceAlertsDesc: 'Alertes lors des changements de tarifs',
    maintenanceTips: 'Conseils de maintenance', maintenanceTipsDesc: 'Conseils d\'efficacité énergétique',
    privacyControl: 'Contrôlez comment vos données sont partagées et utilisées.',
    shareMetrics: 'Partager les métriques', shareMetricsDesc: 'Partager des données anonymisées avec les chercheurs',
    publicLeaderboard: 'Classement public', publicLeaderboardDesc: 'Afficher votre nom dans les classements',
    usageAnalytics: 'Analyses d\'utilisation', usageAnalyticsDesc: 'Aider à améliorer l\'application',
    downloadMyData: 'Télécharger mes données', privacyPolicy: 'Politique de confidentialité',
    autoOffsetSurplus: 'Compensation auto surplus', autoOffsetSurplusDesc: 'Rediriger le surplus solaire vers le réseau',
    communitySharing: 'Partage communautaire', communitySharingDesc: 'Partager les métriques avec le quartier',
    smartScheduling: 'Planification intelligente', smartSchedulingDesc: 'Planification optimisée par IA',
    evCharging: 'Charge VE hors-pointe', evChargingDesc: 'Charger le VE pendant les heures creuses',
    offPeakWindow: 'Fenêtre hors-pointe', start: 'Début', end: 'Fin',
    changePassword: 'Changer le mot de passe',
    currentPassword: 'Mot de passe actuel', newPassword: 'Nouveau mot de passe', confirmPassword: 'Confirmer le mot de passe',
    updatePassword: 'Mettre à jour le mot de passe', passwordMatch: '✓ Les mots de passe correspondent', passwordMismatch: 'Les mots de passe ne correspondent pas',
    twoFactor: 'Authentification à deux facteurs', twoFactorDesc: 'Couche de sécurité supplémentaire',
    regionNote: 'Les changements s\'appliquent instantanément dans toute l\'application.',
    language: 'Langue', timeZone: 'Fuseau horaire', currency: 'Devise', unitSystem: 'Système d\'unités',
    languageLive: 'La langue de l\'interface est maintenant :', rtlActive: '(mise en page RTL active)',
    metric: 'Métrique (kWh, km)', imperial: 'Impérial (miles)',
  },
  de: {
    dashboard: 'Übersicht', leaderboard: 'Rangliste', uploadMeter: 'Zählerstand hochladen',
    energyLab: 'Energie-Labor', community: 'Gemeinschaft', settings: 'Einstellungen',
    support: 'Support', logout: 'Abmelden', search: 'Suchen…',
    viewImpactReport: 'Auswirkungsbericht ansehen',
    settingsTitle: 'Einstellungen',
    settingsSubtitle: 'Verwalten Sie Ihre Einstellungen, Erscheinungsbild und Datenschutz.',
    appearance: 'Erscheinungsbild', notifications: 'Benachrichtigungen',
    privacyData: 'Datenschutz & Daten', energyPrefs: 'Energieeinstellungen',
    languageRegion: 'Sprache & Region', security: 'Sicherheit', dangerZone: 'Gefahrenzone',
    colorMode: 'Farbmodus', light: 'Hell', dark: 'Dunkel', system: 'System',
    accentColor: 'Akzentfarbe', textSize: 'Textgröße',
    small: 'Klein', medium: 'Mittel', large: 'Groß', xlarge: 'Sehr groß',
    accessibility: 'Barrierefreiheit',
    highContrast: 'Hoher Kontrast', highContrastDesc: 'Textkontrast für bessere Lesbarkeit erhöhen',
    reduceMotion: 'Bewegung reduzieren', reduceMotionDesc: 'Animationen und Übergänge minimieren',
    saveAllChanges: 'Alle Änderungen speichern', settingsSaved: 'Einstellungen gespeichert!',
    resetSettings: 'Alle Einstellungen zurücksetzen', resetSettingsDesc: 'Alle Einstellungen auf Standard zurücksetzen',
    deleteAccount: 'Konto löschen', deleteAccountDesc: 'Konto und alle Daten dauerhaft löschen',
    emailAlerts: 'E-Mail-Benachrichtigungen', emailAlertsDesc: 'Kritische Warnungen per E-Mail erhalten',
    pushAlerts: 'Push-Benachrichtigungen', pushAlertsDesc: 'Browser- und mobile Push-Benachrichtigungen',
    weeklyReport: 'Wochenbericht', weeklyReportDesc: 'Wöchentliche Energiezusammenfassung',
    communityPosts: 'Gemeinschaftsbeiträge', communityPostsDesc: 'Aktivität aus Ihrer Nachbarschaft',
    priceAlerts: 'Preiswarnungen', priceAlertsDesc: 'Warnungen bei Energietarifänderungen',
    maintenanceTips: 'Wartungshinweise', maintenanceTipsDesc: 'Tipps zur Energieeffizienz',
    privacyControl: 'Steuern Sie, wie Ihre Daten geteilt und verwendet werden.',
    shareMetrics: 'Metriken teilen', shareMetricsDesc: 'Anonymisierte Daten mit Forschern teilen',
    publicLeaderboard: 'Öffentliche Rangliste', publicLeaderboardDesc: 'Namen in Gemeinschaftsranglisten anzeigen',
    usageAnalytics: 'Nutzungsanalysen', usageAnalyticsDesc: 'App-Verbesserung durch Nutzungsanalysen unterstützen',
    downloadMyData: 'Meine Daten herunterladen', privacyPolicy: 'Datenschutzrichtlinie',
    autoOffsetSurplus: 'Auto-Überschussausgleich', autoOffsetSurplusDesc: 'Solarüberschuss automatisch ins Netz einspeisen',
    communitySharing: 'Gemeinschaftsteilung', communitySharingDesc: 'Metriken mit der Nachbarschaft teilen',
    smartScheduling: 'Intelligente Planung', smartSchedulingDesc: 'KI-optimierte Gerätezeitplanung',
    evCharging: 'EV Nebenzeiten-Laden', evChargingDesc: 'EV nur während Nebenzeiten laden',
    offPeakWindow: 'Nebenzeitfenster', start: 'Beginn', end: 'Ende',
    changePassword: 'Passwort ändern',
    currentPassword: 'Aktuelles Passwort', newPassword: 'Neues Passwort', confirmPassword: 'Passwort bestätigen',
    updatePassword: 'Passwort aktualisieren', passwordMatch: '✓ Passwörter stimmen überein', passwordMismatch: 'Passwörter stimmen nicht überein',
    twoFactor: 'Zwei-Faktor-Authentifizierung', twoFactorDesc: 'Zusätzliche Kontosicherheitsebene',
    regionNote: 'Änderungen gelten sofort in der gesamten App.',
    language: 'Sprache', timeZone: 'Zeitzone', currency: 'Währung', unitSystem: 'Einheitensystem',
    languageLive: 'Oberflächensprache ist jetzt:', rtlActive: '(RTL-Layout aktiv)',
    metric: 'Metrisch (kWh, km)', imperial: 'Imperial (Meilen)',
  },
  es: {
    dashboard: 'Panel', leaderboard: 'Clasificación', uploadMeter: 'Subir lectura',
    energyLab: 'Lab de energía', community: 'Comunidad', settings: 'Configuración',
    support: 'Soporte', logout: 'Cerrar sesión', search: 'Buscar…',
    viewImpactReport: 'Ver informe de impacto',
    settingsTitle: 'Configuración',
    settingsSubtitle: 'Gestione sus preferencias, apariencia, notificaciones y privacidad.',
    appearance: 'Apariencia', notifications: 'Notificaciones',
    privacyData: 'Privacidad & Datos', energyPrefs: 'Preferencias de energía',
    languageRegion: 'Idioma & Región', security: 'Seguridad', dangerZone: 'Zona peligrosa',
    colorMode: 'Modo de color', light: 'Claro', dark: 'Oscuro', system: 'Sistema',
    accentColor: 'Color de acento', textSize: 'Tamaño de texto',
    small: 'Pequeño', medium: 'Mediano', large: 'Grande', xlarge: 'Muy grande',
    accessibility: 'Accesibilidad',
    highContrast: 'Alto contraste', highContrastDesc: 'Aumentar el contraste del texto',
    reduceMotion: 'Reducir movimiento', reduceMotionDesc: 'Minimizar animaciones y transiciones',
    saveAllChanges: 'Guardar todo', settingsSaved: '¡Configuración guardada!',
    resetSettings: 'Restablecer todo', resetSettingsDesc: 'Restaurar todas las preferencias predeterminadas',
    deleteAccount: 'Eliminar cuenta', deleteAccountDesc: 'Eliminar permanentemente su cuenta y datos',
    emailAlerts: 'Alertas de correo', emailAlertsDesc: 'Recibir alertas críticas por correo electrónico',
    pushAlerts: 'Notificaciones push', pushAlertsDesc: 'Notificaciones push de navegador y móvil',
    weeklyReport: 'Informe semanal', weeklyReportDesc: 'Resumen semanal de energía',
    communityPosts: 'Publicaciones comunitarias', communityPostsDesc: 'Actividad de tu barrio',
    priceAlerts: 'Alertas de precios', priceAlertsDesc: 'Alertas cuando cambien las tarifas',
    maintenanceTips: 'Consejos de mantenimiento', maintenanceTipsDesc: 'Consejos de eficiencia energética',
    privacyControl: 'Controle cómo se comparten y usan sus datos.',
    shareMetrics: 'Compartir métricas', shareMetricsDesc: 'Compartir datos anónimos con investigadores',
    publicLeaderboard: 'Clasificación pública', publicLeaderboardDesc: 'Mostrar nombre en clasificaciones comunitarias',
    usageAnalytics: 'Análisis de uso', usageAnalyticsDesc: 'Ayudar a mejorar la aplicación',
    downloadMyData: 'Descargar mis datos', privacyPolicy: 'Política de privacidad',
    autoOffsetSurplus: 'Compensación auto surplus', autoOffsetSurplusDesc: 'Redirigir el excedente solar a la red',
    communitySharing: 'Compartir comunitario', communitySharingDesc: 'Compartir métricas con el barrio',
    smartScheduling: 'Programación inteligente', smartSchedulingDesc: 'Programación optimizada por IA',
    evCharging: 'Carga VE Valle', evChargingDesc: 'Cargar VE solo en horas valle',
    offPeakWindow: 'Ventana valle', start: 'Inicio', end: 'Fin',
    changePassword: 'Cambiar contraseña',
    currentPassword: 'Contraseña actual', newPassword: 'Nueva contraseña', confirmPassword: 'Confirmar contraseña',
    updatePassword: 'Actualizar contraseña', passwordMatch: '✓ Las contraseñas coinciden', passwordMismatch: 'Las contraseñas no coinciden',
    twoFactor: 'Autenticación de dos factores', twoFactorDesc: 'Capa adicional de seguridad',
    regionNote: 'Los cambios se aplican al instante en toda la aplicación.',
    language: 'Idioma', timeZone: 'Zona horaria', currency: 'Moneda', unitSystem: 'Sistema de unidades',
    languageLive: 'El idioma de la interfaz es ahora:', rtlActive: '(diseño RTL activo)',
    metric: 'Métrico (kWh, km)', imperial: 'Imperial (millas)',
  },
  pt: {
    dashboard: 'Painel', leaderboard: 'Classificação', uploadMeter: 'Enviar leitura',
    energyLab: 'Lab de energia', community: 'Comunidade', settings: 'Configurações',
    support: 'Suporte', logout: 'Sair', search: 'Pesquisar…',
    viewImpactReport: 'Ver relatório de impacto',
    settingsTitle: 'Configurações',
    settingsSubtitle: 'Gerencie suas preferências, aparência, notificações e privacidade.',
    appearance: 'Aparência', notifications: 'Notificações',
    privacyData: 'Privacidade & Dados', energyPrefs: 'Preferências de energia',
    languageRegion: 'Idioma & Região', security: 'Segurança', dangerZone: 'Zona de perigo',
    colorMode: 'Modo de cor', light: 'Claro', dark: 'Escuro', system: 'Sistema',
    accentColor: 'Cor de destaque', textSize: 'Tamanho do texto',
    small: 'Pequeno', medium: 'Médio', large: 'Grande', xlarge: 'Muito grande',
    accessibility: 'Acessibilidade',
    highContrast: 'Alto contraste', highContrastDesc: 'Aumentar o contraste do texto',
    reduceMotion: 'Reduzir movimento', reduceMotionDesc: 'Minimizar animações e transições',
    saveAllChanges: 'Salvar tudo', settingsSaved: 'Configurações salvas!',
    resetSettings: 'Redefinir tudo', resetSettingsDesc: 'Restaurar todas as preferências padrão',
    deleteAccount: 'Excluir conta', deleteAccountDesc: 'Excluir permanentemente sua conta e dados',
    emailAlerts: 'Alertas de e-mail', emailAlertsDesc: 'Receber alertas críticos por e-mail',
    pushAlerts: 'Notificações push', pushAlertsDesc: 'Notificações push de navegador e celular',
    weeklyReport: 'Relatório semanal', weeklyReportDesc: 'Resumo semanal de energia',
    communityPosts: 'Publicações da comunidade', communityPostsDesc: 'Atividade do seu bairro',
    priceAlerts: 'Alertas de preço', priceAlertsDesc: 'Alertas quando as tarifas mudarem',
    maintenanceTips: 'Dicas de manutenção', maintenanceTipsDesc: 'Dicas de eficiência energética',
    privacyControl: 'Controle como seus dados são compartilhados e usados.',
    shareMetrics: 'Compartilhar métricas', shareMetricsDesc: 'Compartilhar dados anônimos com pesquisadores',
    publicLeaderboard: 'Classificação pública', publicLeaderboardDesc: 'Mostrar nome nas classificações comunitárias',
    usageAnalytics: 'Análise de uso', usageAnalyticsDesc: 'Ajudar a melhorar o aplicativo',
    downloadMyData: 'Baixar meus dados', privacyPolicy: 'Política de privacidade',
    autoOffsetSurplus: 'Compensação auto excedente', autoOffsetSurplusDesc: 'Redirecionar excedente solar para a rede',
    communitySharing: 'Compartilhamento comunitário', communitySharingDesc: 'Compartilhar métricas com o bairro',
    smartScheduling: 'Agendamento inteligente', smartSchedulingDesc: 'Agendamento de dispositivos otimizado por IA',
    evCharging: 'Carregamento VE fora de pico', evChargingDesc: 'Carregar VE apenas fora do horário de pico',
    offPeakWindow: 'Janela fora de pico', start: 'Início', end: 'Fim',
    changePassword: 'Alterar senha',
    currentPassword: 'Senha atual', newPassword: 'Nova senha', confirmPassword: 'Confirmar senha',
    updatePassword: 'Atualizar senha', passwordMatch: '✓ As senhas coincidem', passwordMismatch: 'As senhas não coincidem',
    twoFactor: 'Autenticação de dois fatores', twoFactorDesc: 'Camada extra de segurança da conta',
    regionNote: 'As alterações se aplicam instantaneamente em todo o aplicativo.',
    language: 'Idioma', timeZone: 'Fuso horário', currency: 'Moeda', unitSystem: 'Sistema de unidades',
    languageLive: 'O idioma da interface agora é:', rtlActive: '(layout RTL ativo)',
    metric: 'Métrico (kWh, km)', imperial: 'Imperial (milhas)',
  },
  ar: {
    dashboard: 'لوحة التحكم', leaderboard: 'لوحة المتصدرين', uploadMeter: 'رفع قراءة العداد',
    energyLab: 'مختبر الطاقة', community: 'المجتمع', settings: 'الإعدادات',
    support: 'الدعم', logout: 'تسجيل الخروج', search: 'بحث…',
    viewImpactReport: 'عرض تقرير التأثير',
    settingsTitle: 'الإعدادات',
    settingsSubtitle: 'إدارة تفضيلاتك والمظهر والإشعارات والخصوصية.',
    appearance: 'المظهر', notifications: 'الإشعارات',
    privacyData: 'الخصوصية والبيانات', energyPrefs: 'تفضيلات الطاقة',
    languageRegion: 'اللغة والمنطقة', security: 'الأمان', dangerZone: 'المنطقة الخطرة',
    colorMode: 'وضع الألوان', light: 'فاتح', dark: 'داكن', system: 'النظام',
    accentColor: 'لون التمييز', textSize: 'حجم النص',
    small: 'صغير', medium: 'متوسط', large: 'كبير', xlarge: 'كبير جداً',
    accessibility: 'إمكانية الوصول',
    highContrast: 'تباين عالٍ', highContrastDesc: 'زيادة تباين النص لتحسين القراءة',
    reduceMotion: 'تقليل الحركة', reduceMotionDesc: 'تقليل الرسوم المتحركة والتحولات',
    saveAllChanges: 'حفظ جميع التغييرات', settingsSaved: 'تم حفظ الإعدادات!',
    resetSettings: 'إعادة تعيين الكل', resetSettingsDesc: 'استعادة جميع التفضيلات الافتراضية',
    deleteAccount: 'حذف الحساب', deleteAccountDesc: 'حذف حسابك وجميع بياناتك نهائياً',
    emailAlerts: 'تنبيهات البريد الإلكتروني', emailAlertsDesc: 'استقبال التنبيهات الهامة عبر البريد الإلكتروني',
    pushAlerts: 'الإشعارات الفورية', pushAlertsDesc: 'إشعارات المتصفح والجوال',
    weeklyReport: 'التقرير الأسبوعي', weeklyReportDesc: 'ملخص الطاقة الأسبوعي',
    communityPosts: 'منشورات المجتمع', communityPostsDesc: 'نشاط حيك',
    priceAlerts: 'تنبيهات الأسعار', priceAlertsDesc: 'تنبيهات عند تغيير التعريفات',
    maintenanceTips: 'نصائح الصيانة', maintenanceTipsDesc: 'نصائح كفاءة الطاقة',
    privacyControl: 'تحكم في كيفية مشاركة واستخدام بياناتك.',
    shareMetrics: 'مشاركة المقاييس', shareMetricsDesc: 'مشاركة بيانات مجهولة مع الباحثين',
    publicLeaderboard: 'لوحة المتصدرين العامة', publicLeaderboardDesc: 'إظهار اسمك في لوحات المتصدرين',
    usageAnalytics: 'تحليلات الاستخدام', usageAnalyticsDesc: 'المساعدة في تحسين التطبيق',
    downloadMyData: 'تحميل بياناتي', privacyPolicy: 'سياسة الخصوصية',
    autoOffsetSurplus: 'موازنة الفائض التلقائية', autoOffsetSurplusDesc: 'إعادة توجيه الفائض الشمسي للشبكة',
    communitySharing: 'المشاركة المجتمعية', communitySharingDesc: 'مشاركة المقاييس مع الحي',
    smartScheduling: 'الجدولة الذكية', smartSchedulingDesc: 'جدولة الأجهزة المحسّنة بالذكاء الاصطناعي',
    evCharging: 'شحن السيارة في ساعات الذروة المنخفضة', evChargingDesc: 'شحن السيارة الكهربائية خارج ساعات الذروة فقط',
    offPeakWindow: 'نافذة خارج الذروة', start: 'البداية', end: 'النهاية',
    changePassword: 'تغيير كلمة المرور',
    currentPassword: 'كلمة المرور الحالية', newPassword: 'كلمة مرور جديدة', confirmPassword: 'تأكيد كلمة المرور',
    updatePassword: 'تحديث كلمة المرور', passwordMatch: '✓ كلمات المرور متطابقة', passwordMismatch: 'كلمات المرور غير متطابقة',
    twoFactor: 'المصادقة الثنائية', twoFactorDesc: 'طبقة إضافية من أمان الحساب',
    regionNote: 'تُطبَّق التغييرات فوراً في جميع أنحاء التطبيق.',
    language: 'اللغة', timeZone: 'المنطقة الزمنية', currency: 'العملة', unitSystem: 'نظام الوحدات',
    languageLive: 'لغة الواجهة الآن:', rtlActive: '(تخطيط RTL نشط)',
    metric: 'متري (كيلوواط ساعة، كم)', imperial: 'إمبراطوري (ميل)',
  },
  zu: {
    dashboard: 'Ibhodi', leaderboard: 'Uhlu lwabaholayo', uploadMeter: 'Layisha umfundisi',
    energyLab: 'Ilebhu yamandla', community: 'Umphakathi', settings: 'Izilungiselelo',
    support: 'Usizo', logout: 'Phuma', search: 'Sesha…',
    viewImpactReport: 'Buka umbiko womthelela',
    settingsTitle: 'Izilungiselelo',
    settingsSubtitle: 'Phatha izintandokazi zakho, ukubukeka, izaziso nobuqeqebana.',
    appearance: 'Ukubukeka', notifications: 'Izaziso',
    privacyData: 'Ubumfihlo & Idatha', energyPrefs: 'Izintandokazi zamandla',
    languageRegion: 'Ulimi & Isifunda', security: 'Ukuphepha', dangerZone: 'Indawo yengozi',
    colorMode: 'Imodi yombala', light: 'Ukukhanya', dark: 'Ubumnyama', system: 'Uhlelo',
    accentColor: 'Umbala wokuphawula', textSize: 'Ubude bomqondo',
    small: 'Omncane', medium: 'Okumaphakathi', large: 'Omkhulu', xlarge: 'Omkhulu kakhulu',
    accessibility: 'Ukufinyelela',
    highContrast: 'Ukungaboni', highContrastDesc: 'Khulisa umehluko wombalo',
    reduceMotion: 'Nciphisa ukushukuma', reduceMotionDesc: 'Nciphisa izithombe ezigelezayo',
    saveAllChanges: 'Gcina zonke izinguquko', settingsSaved: 'Izilungiselelo zigcinwe!',
    resetSettings: 'Setha kabusha konke', resetSettingsDesc: 'Buyisela izintandokazi kwezimiswa',
    deleteAccount: 'Susa i-akhawunti', deleteAccountDesc: 'Susa i-akhawunti yakho nazo zonke idatha unomphela',
    emailAlerts: 'Izaziso ze-imeyili', emailAlertsDesc: 'Yamukela izaziso ezibalulekile nge-imeyili',
    pushAlerts: 'Izaziso ze-push', pushAlertsDesc: 'Izaziso ze-push zebhrawuza neselula',
    weeklyReport: 'Umbiko wamasonto', weeklyReportDesc: 'Isifinyezo samandla samasonto',
    communityPosts: 'Izithangami zomphakathi', communityPostsDesc: 'Ukusebenza kwezwe lakho',
    priceAlerts: 'Izaziso zamanani', priceAlertsDesc: 'Izaziso lapho amanani aguquka',
    maintenanceTips: 'Amaqhinga okulungisa', maintenanceTipsDesc: 'Amaqhinga okusebenzisa amandla',
    privacyControl: 'Lawula ukuthi idatha yakho yabiwa kanjani.',
    shareMetrics: 'Yabelana ngezinkomba', shareMetricsDesc: 'Yabelana ngedatha engaziwa nabanye abacwaningi',
    publicLeaderboard: 'Uhlu olukhulekayo', publicLeaderboardDesc: 'Bonisa igama lakho ezihlahleni',
    usageAnalytics: 'Ukuhlaziya ukusetshenziswa', usageAnalyticsDesc: 'Siza ukuthuthukisa uhlelo lwethu',
    downloadMyData: 'Landa idatha yami', privacyPolicy: 'Inqubomgomo yobumfihlo',
    autoOffsetSurplus: 'Ukususa ngokwawo okweqile', autoOffsetSurplusDesc: 'Yendulela amandla elanga athe xaxa',
    communitySharing: 'Ukwabelana nomphakathi', communitySharingDesc: 'Yabelana ngezinkomba nezwe lakho',
    smartScheduling: 'Ukuhlelwa okuhlakanipha', smartSchedulingDesc: 'Ukuhlelwa kwezinto ngeITI',
    evCharging: 'Ukushaja i-EV ngaphandle kwesikhathi', evChargingDesc: 'Shaja i-EV ngaphandle kwesikhathi esiphezulu',
    offPeakWindow: 'Isikhathi esiphansi', start: 'Qala', end: 'Phela',
    changePassword: 'Shintsha iphasiwedi',
    currentPassword: 'Iphasiwedi yamanje', newPassword: 'Iphasiwedi entsha', confirmPassword: 'Qinisekisa iphasiwedi',
    updatePassword: 'Buyekeza iphasiwedi', passwordMatch: '✓ Amaphasiwedi afana', passwordMismatch: 'Amaphasiwedi awafani',
    twoFactor: 'Ukufakazela okubili', twoFactorDesc: 'Izinga lengeziwe lokuphepha kwe-akhawunti',
    regionNote: 'Izinguquko ziyasebenza ngokushesha kuyo yonke inhlangano.',
    language: 'Ulimi', timeZone: 'Isifunda sesikhathi', currency: 'Imali', unitSystem: 'Uhlelo lweyunithi',
    languageLive: 'Ulimi lokusebenzelana manje:', rtlActive: '(i-RTL layout iyasebenza)',
    metric: 'Imetrikhi (kWh, km)', imperial: 'I-Imperial (amakhilomitha)',
  },
  xh: {
    dashboard: 'Ibhodi', leaderboard: 'Uluhlu lwabaholi', uploadMeter: 'Layisha umfundi',
    energyLab: 'Ilebhu yamandla', community: 'Uluntu', settings: 'Iinqobo',
    support: 'Inkxaso', logout: 'Phuma', search: 'Khangela…',
    viewImpactReport: 'Jonga ingxelo yempembelelo',
    settingsTitle: 'Iinqobo',
    settingsSubtitle: 'Lawula izithandwa zakho, ukubonakala, izaziso nokhuseleko lweenkcukacha.',
    appearance: 'Ukubonakala', notifications: 'Izaziso',
    privacyData: 'Ubumfihlo & Idatha', energyPrefs: 'Izithandwa zamandla',
    languageRegion: 'Ulwimi & Ummandla', security: 'Ukhuseleko', dangerZone: 'Indawo eyingozi',
    colorMode: 'Imowudi yombala', light: 'Ukukhanya', dark: 'Ubumnyama', system: 'Inkqubo',
    accentColor: 'Umbala wophawu', textSize: 'Ubungakanani bomzekelo',
    small: 'Omncinane', medium: 'Phakathi', large: 'Omkhulu', xlarge: 'Omkhulu kakhulu',
    accessibility: 'Ukufikeleleka',
    highContrast: 'Umahluko ophezulu', highContrastDesc: 'Yandisa umahluko wombhalo',
    reduceMotion: 'Nciphisa intshukumo', reduceMotionDesc: 'Nciphisa iinimeshini',
    saveAllChanges: 'Gcina zonke iinguqulelo', settingsSaved: 'Iinqobo zigciniwe!',
    resetSettings: 'Seta kabusha konke', resetSettingsDesc: 'Buyisela izithandwa kwiimpawu',
    deleteAccount: 'Cima i-akhawunti', deleteAccountDesc: 'Cima i-akhawunti yakho nawo onke idatha ngonaphakade',
    emailAlerts: 'Iingxelo ze-imeyili', emailAlertsDesc: 'Yamkela iingxelo ezibalulekileyo nge-imeyili',
    pushAlerts: 'Izaziso ze-push', pushAlertsDesc: 'Izaziso ze-push zebhrawuza nomobileyo',
    weeklyReport: 'Ingxelo yeveki', weeklyReportDesc: 'Isishwankathelo samandla seveki',
    communityPosts: 'Izihloko zoluntu', communityPostsDesc: 'Ukusebenza ewaleni lakho',
    priceAlerts: 'Iingxelo zamaxabiso', priceAlertsDesc: 'Iingxelo xa amaxabiso eshintsha',
    maintenanceTips: 'Iingcebiso zokulungisa', maintenanceTipsDesc: 'Iingcebiso zokusebenzisa amandla',
    privacyControl: 'Lawula ukuba idatha yakho yabiwa njani.',
    shareMetrics: 'Yabelana ngezilinganiso', shareMetricsDesc: 'Yabelana ngedatha engaziwayo nabaphandi',
    publicLeaderboard: 'Uluhlu lwabaholi oluvulelekileyo', publicLeaderboardDesc: 'Bonisa igama lakho kwizitshixo',
    usageAnalytics: 'Uphononongo lokusetyenziswa', usageAnalyticsDesc: 'Nceda ukuphucula uhlelo',
    downloadMyData: 'Khuphela idatha yam', privacyPolicy: 'Imigaqo yobumfihlo',
    autoOffsetSurplus: 'Ukususa okweqileyo ngokwawo', autoOffsetSurplusDesc: 'Thumela amandla e-solar eqileyo kwinethiwekhi',
    communitySharing: 'Ukwabelana noluntu', communitySharingDesc: 'Yabelana nezilinganiso newal lakho',
    smartScheduling: 'Ukuhlelwa okunobuqili', smartSchedulingDesc: 'Ukuhlelwa kwezixhobo nge-AI',
    evCharging: 'Ukushaja i-EV ngaphandle kwexesha eliphezulu', evChargingDesc: 'Shaja i-EV ngaphandle kwexesha eliphezulu',
    offPeakWindow: 'Ixesha eliphantsi', start: 'Qala', end: 'Phela',
    changePassword: 'Tshintsha igama eligqitiweyo',
    currentPassword: 'Igama eligqitiweyo langoku', newPassword: 'Igama eligqitiweyo elitsha', confirmPassword: 'Qinisekisa igama eligqitiweyo',
    updatePassword: 'Hlaziya igama eligqitiweyo', passwordMatch: '✓ Amagama afana', passwordMismatch: 'Amagama aafani',
    twoFactor: 'Ukuqinisekiswa okubini', twoFactorDesc: 'Inqanaba elingeziwe lokhuseleko lwe-akhawunti',
    regionNote: 'Iinguqulelo ziyasebenza ngokukhawuleza kuyo yonke inkqubo.',
    language: 'Ulwimi', timeZone: 'Umda wexesha', currency: 'Imali', unitSystem: 'Inkqubo yeyunithi',
    languageLive: 'Ulwimi lwenkqubo ngoku:', rtlActive: '(i-RTL layout iyasebenza)',
    metric: 'Imetrikhi (kWh, km)', imperial: 'I-Imperial (iimayile)',
  },
}

// ─── Store definition ─────────────────────────────────────────────────────────
export const useUserPrefsStore = defineStore('userPrefs', () => {

  // ── Persisted reactive state ────────────────────────────────────────────────
  const accentKey    = ref(localStorage.getItem('ep-accent')       || 'blue')
  const themeMode    = ref(localStorage.getItem('ep-theme-mode')   || 'system') // 'light'|'dark'|'system'
  const fontSize     = ref(Number(localStorage.getItem('ep-font-size')) || 16)
  const highContrast = ref(localStorage.getItem('ep-hc')           === 'true')
  const reduceMotion = ref(localStorage.getItem('ep-motion')       === 'true')
  const language     = ref(localStorage.getItem('ep-lang')         || 'en')
  const energyUnit   = ref(localStorage.getItem('ep-unit')         || 'kWh')
  const timezone     = ref(localStorage.getItem('ep-timezone')     || 'Africa/Johannesburg')
  const currency     = ref(localStorage.getItem('ep-currency')     || 'ZAR')
  const unitSystem   = ref(localStorage.getItem('ep-unit-system')  || 'metric')
  const sidebarOpen  = ref(true)
  const darkMode     = ref(false) // updated by applyAll

  // ── Computed ────────────────────────────────────────────────────────────────
  const isDark = computed(() => {
    if (themeMode.value === 'system') return window.matchMedia('(prefers-color-scheme: dark)').matches
    return themeMode.value === 'dark'
  })

  // Current translation object — falls back to 'en' for any missing keys
  const t = computed(() => {
    const base = TRANSLATIONS.en
    const lang = TRANSLATIONS[language.value] || {}
    return { ...base, ...lang }
  })

  // ── Master apply function ───────────────────────────────────────────────────
  // This is the ONLY place that writes to <html>. It must be called after every
  // preference change so the entire UI stays in sync.
  function applyAll() {
    const html = document.documentElement
    const dark = isDark.value

    darkMode.value = dark

    // 1. Dark/light class — MUST come before CSS var writes so Tailwind dark: variants work
    html.classList.toggle('dark', dark)

    // 2. Surface tokens (dark / light)
    const surfaces = dark ? DARK_SURFACES : LIGHT_SURFACES
    for (const [k, v] of Object.entries(surfaces)) html.style.setProperty(k, v)

    // 3. Accent palette — overwrites surface defaults for accent colours
    const palette = ACCENT_PALETTES[accentKey.value] || ACCENT_PALETTES.blue
    for (const [k, v] of Object.entries(palette)) html.style.setProperty(k, v)

    // 4. High contrast — applied LAST so it wins over everything else
    html.classList.toggle('high-contrast', highContrast.value)
    if (highContrast.value) {
      const hc = dark ? HC_DARK : HC_LIGHT
      for (const [k, v] of Object.entries(hc)) html.style.setProperty(k, v)
    }

    // 5. Font size — root px value; Tailwind text-* classes scale from this
    html.style.fontSize = fontSize.value + 'px'

    // 6. Reduce motion
    html.classList.toggle('reduce-motion', reduceMotion.value)

    // 7. RTL + lang attribute
    const RTL_LANGS = ['ar', 'he', 'fa', 'ur']
    html.setAttribute('dir', RTL_LANGS.includes(language.value) ? 'rtl' : 'ltr')
    html.setAttribute('lang', language.value)
  }

  // ── Setters ─────────────────────────────────────────────────────────────────
  function setAccent(key) {
    accentKey.value = key
    localStorage.setItem('ep-accent', key)
    applyAll()
  }

  function setThemeMode(mode) { // 'light' | 'dark' | 'system'
    themeMode.value = mode
    localStorage.setItem('ep-theme-mode', mode)
    applyAll()
  }

  function setDarkMode(v)   { setThemeMode(v ? 'dark' : 'light') }
  function toggleTheme()    { setThemeMode(isDark.value ? 'light' : 'dark') }

  function setFontSize(v) {
    fontSize.value = v
    localStorage.setItem('ep-font-size', String(v))
    applyAll()
  }

  function setHighContrast(v) {
    highContrast.value = v
    localStorage.setItem('ep-hc', String(v))
    applyAll()
  }

  function setReduceMotion(v) {
    reduceMotion.value = v
    localStorage.setItem('ep-motion', String(v))
    applyAll()
  }

  function setLanguage(v) {
    language.value = v
    localStorage.setItem('ep-lang', v)
    applyAll()
  }

  function setEnergyUnit(v)  { energyUnit.value = v;  localStorage.setItem('ep-unit', v) }
  function setTimezone(v)    { timezone.value   = v;  localStorage.setItem('ep-timezone', v) }
  function setCurrency(v)    { currency.value   = v;  localStorage.setItem('ep-currency', v) }
  function setUnitSystem(v)  { unitSystem.value = v;  localStorage.setItem('ep-unit-system', v) }
  function toggleSidebar()   { sidebarOpen.value = !sidebarOpen.value }

  // ── OS theme change listener ─────────────────────────────────────────────────
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themeMode.value === 'system') applyAll()
  })

  // Apply immediately on store creation
  applyAll()

  return {
    accentKey, darkMode, isDark, themeMode, fontSize,
    highContrast, reduceMotion, language, energyUnit,
    timezone, currency, unitSystem, sidebarOpen,
    accentPalettes: ACCENT_PALETTES, t,
    applyAll,
    setAccent, setThemeMode, setDarkMode, toggleTheme,
    setFontSize, setHighContrast, setReduceMotion,
    setLanguage, setEnergyUnit, setTimezone, setCurrency, setUnitSystem,
    toggleSidebar,
  }
})

// Backward-compat alias — older components that import useThemeStore keep working
export const useThemeStore = useUserPrefsStore
