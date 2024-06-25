import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/login', name: 'login', component: Login },
  ]
})

router.beforeEach((to) => {
  if (to.name === 'login') {
    const token = localStorage.getItem('access_token');
    if (token) {
      return { name: 'home' };
    }
  }
  if (to.name !== 'login') {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    } else {
      return { name: 'login' };
    }
  }
  return true;
});

export default router
