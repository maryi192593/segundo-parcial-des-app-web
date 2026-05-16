import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/loginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductView from '../views/ProductView.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/dashboard',
    component: DashboardView,
    children: [
      {
        path: '', name: 'Inicio' 
      },
      {
       path: 'productos', name: 'Productos', component: ProductView 
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router