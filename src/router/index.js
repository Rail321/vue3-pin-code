import { createRouter, createWebHistory } from 'vue-router'
import PageIndex from '@/pages/PageIndex'

const routes = [
  {
    path: '/',
    component: PageIndex
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
