import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Login from '../components/Login.vue';
import Logout from '../components/Logout.vue';
import Dashboard from '../components/Dashboard.vue';
import Planner from '../components/Planner.vue';
import { useAuth0 } from '@auth0/auth0-vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard' // Redirect from root to dashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout,
    meta: { requiresAuth: true }
  },
  {
    path: '/planner',
    name: 'Planner',
    component: Planner,
    meta: { requiresAuth: true }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;