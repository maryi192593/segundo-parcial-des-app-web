import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/loginView.vue'
import DashboardView from '../views/DashboardView.vue'
import ProductosView from '../views/ProductosView.vue'

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
    name: 'Dashboard',
    component: DashboardView,
    // Vistas hijas — se muestran dentro del <router-view> del DashboardView
    children: [
      {
        path: 'productos',
        name: 'Productos',
        component: ProductosView
      }
    ]
  }
]
 
const router = createRouter({
  history: createWebHistory(),
  routes
})
 
export default router