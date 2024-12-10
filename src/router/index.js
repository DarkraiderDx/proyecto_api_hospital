import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/Login.vue'),
      meta: {
        requireIfAuth: true,
        resource: 'auth',
        action: 'show'
      }
    },
    {
      path: '/admin',
      name: 'AppLayout',
      component: () => import('../layout/AppLayout.vue'),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '',
          name: 'Admin',
          component: () => import('../views/admin/Admin.vue'),
          meta: { requireAuth: true, resource: 'auth', action: 'show' }
        },
        {
          path: 'perfil',
          name: 'Perfil',
          component: () => import('../views/admin/Perfil.vue'),
          meta:{ requireAuth: true,
            resource: 'auth',
            action: 'index' }
          },
        {
          path: 'formulario-d8',
          name: 'FormularioD8',
          component: () => import('../views/hospital/FormularioD8.vue'),
          meta: { requireAuth: true }
        },
        {
          path: 'formulario-p8',
          name: 'FormularioP8',
          component: () => import('../views/hospital/FormularioP8.vue'),
          meta: { requireAuth: true }
        },
        {
          path: 'formulario-d100',
          name: 'FormularioD100',
          component: () => import('../views/hospital/FormularioD100.vue'),
          meta: { requireAuth: true }
        },
        {
          path: 'formulario-p100',
          name: 'FormularioP100',
          component: () => import('../views/hospital/FormularioP100.vue'),
          meta: { requireAuth: true }
        },
        
        
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("access_token");
  if (to.meta.requireAuth) {
    if (!token) return next({ name: "Login" });
    return next();
  }
  if (to.meta.requireIfAuth && token) {
    return next({ name: 'Admin' });
  }
  return next();
});

export default router;
