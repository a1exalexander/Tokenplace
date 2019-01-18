import Vue from 'vue'
import Router from 'vue-router'
import Trading from '@/views/Trading.vue'
import MyExchanges from '@/views/MyExchanges.vue'
import Portfolio from '@/views/Portfolio.vue'
import Dashboard from '@/views/Dashboard.vue'
import Login from '@/views/Login.vue'
import Settings from '@/views/Settings.vue'
import General from '@/components/settings/General.vue'
import Security from '@/components/settings/Security.vue'
import Affiliate from '@/components/settings/Affiliate.vue'
import Plans from '@/components/settings/Plans.vue'
import Verification from '@/components/settings/Verification.vue'
import Support from '@/views/Support.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV === 'production'
  ? '/Tokenplace/dist/'
  : '/',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard
    },
    {
      path: '/trading',
      name: 'trading',
      component: Trading
    },
    {
      path: '/exchanges',
      name: 'exchanges',
      component: MyExchanges
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: Portfolio
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/support',
      name: 'support',
      component: Support
    },
    {
      path: '/settings',
      component: Settings,
      children: [
        {
          path: '',
          name: 'settings',
          component: General
        },
        {
          path: 'security',
          name: 'security',
          component: Security
        },
        {
          path: 'affiliate',
          name: 'affiliate',
          component: Affiliate
        },
        {
          path: 'plans',
          name: 'plans',
          component: Plans
        },
        {
          path: 'verification',
          name: 'verification',
          component: Verification
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
