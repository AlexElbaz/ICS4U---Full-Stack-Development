import { createRouter, createWebHistory } from 'vue-router'
import Standings from '../views/Standings.vue'

const routes = [
  {
    path: '/',
    name: 'Standings',
    component: Standings
  },
  {
    path: '/matches',
    name: 'Matches',
    component: () => import('../views/Matches.vue')
  },
  {
    path: '/addmatch',
    name: 'Addmatch',
    component: () => import('../views/AddMatch.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
