import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{requiresAuth: true}
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {
      if (localStorage.access_token) next('/')
      else next()
    }
  },
  {
    path: '/tag/:name',
    name: 'Tag',
    component: Home,
    meta:{requiresAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) =>{
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('access_token')) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
