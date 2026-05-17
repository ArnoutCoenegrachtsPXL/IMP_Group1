import { createRouter, createWebHistory } from 'vue-router'

import LandingPageView         from '../views/LandingPageView.vue'
import LoginView               from '../views/LoginView.vue'
import RegisterView            from '../views/RegisterView.vue'
import CompleteProfileView     from '../views/CompleteProfileView.vue'
import DashboardView           from '@/views/DashboardView.vue'
import UploadMeterView         from '@/views/UploadMeterView.vue'
import EnergyTipsView          from '@/views/EnergyTipsView.vue'
import ForgotPasswordView      from '@/views/ForgotPasswordView.vue'
import ResetPasswordView       from '@/views/ResetPasswordView.vue'
import LeaderboardPersonalView from '@/views/LeaderboardPersonalView.vue'
import SettingsView            from '../views/SettingsView.vue'
import SupportView             from '@/views/SupportView.vue'
import CommunityView           from '@/views/CommunityView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return new Promise(resolve => {
        setTimeout(() => {
          const el = document.querySelector(to.hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            el.classList.add('ring-2', 'ring-primary', 'ring-offset-2')
            setTimeout(() => el.classList.remove('ring-2', 'ring-primary', 'ring-offset-2'), 1800)
          }
          resolve({ el: to.hash, behavior: 'smooth' })
        }, 120)
      })
    }
    if (savedPosition) return savedPosition
    return { top: 0, behavior: 'smooth' }
  },

  routes: [
    // Public
    { path: '/',                 name: 'landing',         component: LandingPageView        },
    { path: '/login',            name: 'login',           component: LoginView              },
    { path: '/register',         name: 'register',        component: RegisterView           },
    { path: '/forgot-password',  name: 'forgot-password', component: ForgotPasswordView     },
    { path: '/reset-password',   name: 'reset-password',  component: ResetPasswordView      },
    { path: '/complete-profile', name: 'complete-profile',component: CompleteProfileView    },
    // Protected
    { path: '/dashboard',        name: 'dashboard',       component: DashboardView          },
    { path: '/leaderboard',      name: 'leaderboard',     component: LeaderboardPersonalView},
    { path: '/upload',           name: 'upload-meter',    component: UploadMeterView        },
    { path: '/energy-tips',      name: 'energy-tips',     component: EnergyTipsView         },
    { path: '/settings',         name: 'settings',        component: SettingsView           },
    { path: '/support',          name: 'support',         component: SupportView            },
    { path: '/community',        name: 'community',       component: CommunityView          },

    // Catch-all
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.beforeEach((to, from) => {
  const token     = localStorage.getItem('token')
  const isNewUser = localStorage.getItem('isNewUser') === 'true'

  if (to.name === 'complete-profile' && !isNewUser) {
    return token ? { name: 'dashboard' } : { name: 'login' }
  }

  if (from.name === 'complete-profile') {
    localStorage.removeItem('isNewUser')
  }
})

export default router