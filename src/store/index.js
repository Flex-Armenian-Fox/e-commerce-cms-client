import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import Swal from 'sweetalert2'

Vue.use(Vuex)

axios.defaults.baseURL = 'https://e-carrello.herokuapp.com'

export default new Vuex.Store({
  state: {
    isLogin: false,
    categories: [],
    products: []
  },
  mutations: {
    SET_ISLOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },
    SET_PRODUCTS (state, payload) {
      state.products = payload
    }
  },
  actions: {
    login (context, payload) {
      console.log('masuk axios')
      axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.email,
          password: payload.password
        }
      }).then((result) => {
        localStorage.setItem('access_token', result.data.access_token)
        context.commit('SET_ISLOGIN', true)
        router.push({ name: 'AdminPage' })
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    getCategories (context, payload) {
      axios({
        method: 'GET',
        url: '/categories',
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        console.log(result.data)
        context.commit('SET_CATEGORIES', result.data)
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    addCategory (context, payload) {
      axios({
        method: 'POST',
        url: '/categories',
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          name: payload.name
        }
      }).then((result) => {
        // this.getCategories()
        // router.push('/categories')
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    deleteCategory (context, payload) {
      axios({
        method: 'DELETE',
        url: '/categories/' + payload.id,
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        context.dispatch('getCategories')
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    updateCategory (context, payload) {
      console.log('PAYLOAD', payload)
      axios({
        method: 'PUT',
        url: '/categories/' + payload.id,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      }).then((result) => {
        context.dispatch('getCategories')
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    getProducts (context, payload) {
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        console.log(result.data)
        context.commit('SET_PRODUCTS', result.data)
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    addProduct (context, payload) {
      axios({
        method: 'POST',
        url: '/products',
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      }).then((result) => {
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    deleteProduct (context, payload) {
      axios({
        method: 'DELETE',
        url: '/products/' + payload.id,
        headers: {
          access_token: localStorage.access_token
        }
      }).then((result) => {
        context.dispatch('getProducts')
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    },
    updateProduct (context, payload) {
      axios({
        method: 'PUT',
        url: '/products/' + payload.id,
        headers: {
          access_token: localStorage.access_token
        },
        data: payload
      }).then((result) => {
        context.dispatch('getProducts')
      }).catch(error => {
        Swal.fire({
          type: 'warning',
          title: error.response.data.message,
          message: error.response.data.message,
          showConfirmButton: true,
          timer: 1500
        })
      })
    }
  }
})
