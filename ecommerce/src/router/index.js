import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UsersPage from '../views/UsersPage.vue'
import LoginForm from '../components/LoginForm.vue'
import ProductsPage from '../views/ProductsPage.vue'
import CreateProduct from '../components/CreateProduct.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: {name: 'UsersPage'},
    component: Home
  },
  {
    path: '/users',
    redirect: {name: 'LoginForm'},
    name: 'UsersPage',
    component: UsersPage,
    children: [
      {
        path: 'login',
        name: 'LoginForm',
        component: LoginForm
      }
    ]
  },
  {
    path: '/products',
    name: 'ProductsPage',
    component: ProductsPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/addproduct',
    name: 'CreateProduct',
    component: CreateProduct,
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// NAVIGATION GUARD //

router.beforeEach((to, from, next) => {

  console.log('TO ==> ', to.name)
  console.log('FROM ==> ', from.name)

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (!localStorage.getItem('accesstoken')) next({ path: '/users' })
    else next()
    
  } else {
    next()
  }

})