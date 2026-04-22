import { createRouter, createWebHistory } from 'vue-router'

// Views
import LandingPageView from '../views/LandingPageView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'

import DashboardView from '../views/DashboardView.vue'
import LeaderboardPersonalView from '../views/LeaderboardPersonalView.vue'
import UploadMeterView from '../views/UploadMeterView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPageView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      component: LeaderboardPersonalView
    },
    {
      path: '/upload',
      name: 'upload-meter',
      component: UploadMeterView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    }
  ]
})

export default router