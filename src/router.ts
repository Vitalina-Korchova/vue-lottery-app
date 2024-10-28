import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './components/HomePage.vue'
import AboutPage from './components/AboutPage.vue'
import LotteryPage from './components/LotteryPage.vue'
import LoginPage from './components/LoginPage.vue'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/about',
      name: 'About',
      component: AboutPage
    },
    {
      path: '/lottery',
      name: 'Lottery',
      component: LotteryPage
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginPage
    }
  ]
})

export default router
