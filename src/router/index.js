import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/adminpage',
    name: 'AdminPage',
    component: () => import('../views/AdminPage.vue'),
    children: [
      {
        path: '/categories',
        name: 'CategoryPage',
        component: () => import('../views/category/CategoryPage.vue')
      },
      {
        path: '/categories/add',
        name: 'CategoryForm',
        component: () => import('../views/category/CategoryForm.vue')
      },
      {
        path: '/products',
        name: 'ProductPage',
        component: () => import('../views/product/ProductPage.vue')
      },
      {
        path: '/products/add',
        name: 'ProductForm',
        component: () => import('../views/product/ProductForm.vue')
      },
      {
        path: '/orders/new',
        name: 'NewOrderPage',
        component: () => import('../views/orders/NewOrderPage.vue')
      },
      {
        path: '/orders/process',
        name: 'OrderOnProcessPage',
        component: () => import('../views/orders/OrderOnProcessPage.vue')
      },
      {
        path: '/orders/done',
        name: 'OrderDonePage',
        component: () => import('../views/orders/OrderDonePage.vue')
      },
      {
        path: '/customers',
        name: 'CustomerPage',
        component: () => import('../views/customers/CustomerPage.vue')
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
