import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('access_token')) {
        next('/home')
      } else {
        next()
      }
    }
  },
  {
    path: '/home',
    name: 'Product',
    component: () => import('@/views/products/ProductView.vue'),
    redirect: '/products',
    meta: { requireAuth: true },
    children: [
      {
        path: '/addproduct',
        name: 'AddProduct',
        meta: { requireAuth: true },
        component: () => import('@/components/products/ProductForm.vue')
      },
      {
        path: '/products',
        name: 'ListProducts',
        meta: { requireAuth: true },
        component: () => import('@/components/products/ListProducts.vue')
      },
      {
        path: '/editproduct/:id',
        name: 'EditProduct',
        meta: { requireAuth: true },
        component: () => import('@/components/products/EditProduct.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!localStorage.getItem('access_token')) {
      next({ name: 'Login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
