import { createRouter, createWebHistory } from 'vue-router'

import LandingPageView        from '@/views/LandingPageView.vue'
import LoginView              from '@/views/LoginView.vue'
import RegisterView           from '@/views/RegisterView.vue'
import DashboardView          from '@/views/DashboardView.vue'
import LeaderboardPersonalView from '@/views/LeaderboardPersonalView.vue'
import UploadMeterView        from '@/views/UploadMeterView.vue'
import EnergyTipsView         from '@/views/EnergyTipsView.vue'
import SettingsView           from '@/views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior: (to, from, saved) => saved || { top: 0, behavior: 'smooth' },
  routes: [
    // ── Public (no sidebar) ──────────────────────────────────────────────────
    { path: '/',         name: 'landing',  component: LandingPageView },
    { path: '/login',    name: 'login',    component: LoginView       },
    { path: '/register', name: 'register', component: RegisterView    },
    // ── Protected (sidebar + topbar) ─────────────────────────────────────────
    { path: '/dashboard',    name: 'dashboard',    component: DashboardView           },
    { path: '/leaderboard',  name: 'leaderboard',  component: LeaderboardPersonalView },
    { path: '/upload',       name: 'upload-meter', component: UploadMeterView         },
    { path: '/energy-tips',  name: 'energy-tips',  component: EnergyTipsView          },
    { path: '/settings',     name: 'settings',     component: SettingsView            },
    // ── Catch-all ────────────────────────────────────────────────────────────
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

export default router
