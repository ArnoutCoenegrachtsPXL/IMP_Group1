
import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import LeaderboardPersonalView from '@/views/LeaderboardPersonalView.vue'
import UploadMeterView from '@/views/UploadMeterView.vue'
import EnergyTipsView from '@/views/EnergyTipsView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DashboardView,
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
      path: '/energy-tips',
      name: 'energytips',
      component: EnergyTipsView
    }
  ],
})

export default router
