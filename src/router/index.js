import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import('@/views/products/ProductView.vue'),
    children: [
      {
        path: '/addproduct',
        name: 'AddProduct',
        component: () => import('@/components/products/ProductForm.vue')
      },
      {
        path: '/products',
        name: 'ListProducts',
        component: () => import('@/components/products/ListProducts.vue')
      },
      {
        path: '/editproduct/:id',
        name: 'EditProduct',
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

export default router
