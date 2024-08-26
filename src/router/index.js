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
      meta:{
        requireIfAuth: true,
        resource: 'auth',
        action: 'show'
      }
    },
    {
      path: '/admin',
      name: 'AppLayout',
      component: () => import('../layout/AppLayout.vue'),
      meta:{
        requireAuth: true
      },
      children:[
        {
        path: '',
        name: 'Admin',
        component: () => import('../views/admin/Admin.vue'),
        meta:{ requireAuth: true,
          resource: 'auth',
          action: 'show' }
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
        path: 'user',
        name: 'User',
        component: () => import('../views/admin/user/User.vue'),
        meta:{ requireAuth: true,
          resource: 'auth',
          action: 'index' }
        },
        {
        path: 'role',
        name: 'Role',
        component: () => import('../views/admin/role/Role.vue'),
        meta:{ requireAuth: true,
          resource: 'role',
          action: 'index' }
        },
        {
        path: 'role/:id',
        name: 'RoleEdit',
        component: () => import('../views/admin/role/RoleEdit.vue'),
        meta:{ requireAuth: true,
          resource: 'role',
          action: 'update'
        }
        },
        {
        path: 'permission',
        name: 'Permission',
        component: () => import('../views/admin/role/Permission.vue'),
        meta:{ requireAuth: true,
          resource: 'permission',
          action: 'index'
        
        }
        
      ]
    }
  ]
})

router.beforeEach((to, from, next)=>{
  let token=localStorage.getItem("access_token");
  if(to.meta.requireAuth){
    if(!token)
    return next({name:"Login"})
  return next()
  }
  //aqui para cambiar incio 
  if(to.meta.requireIfAuth && token){
    return next({name:'Admin'})
  }
  return next()
})
export default router
