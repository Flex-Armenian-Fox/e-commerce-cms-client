import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Axios from 'axios'
import Swal from 'sweetalert2'

const axios = Axios.create({
    baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    products: [],
    productsFiltered: [],
    tags: []
  },
  mutations: {
    CHECK_LOGIN(state){
      if(localStorage.access_token) state.isLoggedIn=true
    },
    SET_PRODUCTS(state, payload){
      state.products = payload
    },
    SET_TAGS(state, payload) {state.tags = payload}
  },
  actions: {
    login(context, payload){
      axios.post('/login', payload)
        .then(res => {
          localStorage.access_token = res.data.access_token
          context.commit('CHECK_LOGIN')
          router.push('/')
        })
        .catch(err => {
          console.error(err); 
        })
    },
    fetchData(context){
      axios.get('/products', {headers: {access_token: localStorage.access_token}})
        .then(res => {
          context.commit('SET_PRODUCTS', res.data)
          return axios.get('/tags', {headers: {access_token: localStorage.access_token}})
        })
        .then(res => {
          context.commit('SET_TAGS', res.data)
        })
    },
    putProduct(context, payload){
      console.log(context, payload)
      axios.put('/products/'+payload.id, {
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
        image_url: payload.image_url
      }, {
        headers: {access_token: localStorage.access_token}
      })
      .then(res => {
        console.log(res)
        context.dispatch('fetchData')
      })
      .catch( err => {
        console.log(err)
        Swal.fire(err.message, 'Something went wrong!', 'error')
        context.dispatch('fetchData')
      })
    },
    delProduct(context, payload){
      axios.delete('/products/'+payload,{headers: {access_token: localStorage.access_token}})
      .then(res => {
        console.log(res)
        context.dispatch('fetchData')
      })
      .catch(err => {
        console.log(err)
        Swal.fire(err.message, 'Something went wrong!', 'error')
        context.dispatch('fetchData')
      })
    },
    postProduct(context, payload){
      console.log(context, payload)
      axios.post('/products/', {
        name: payload.name,
        price: payload.price,
        stock: payload.stock,
        image_url: payload.image_url
      }, {
        headers: {access_token: localStorage.access_token}
      })
      .then(res => {
        console.log(res)
        context.dispatch('fetchData')
      })
      .catch( err => {
        console.log(err)
        Swal.fire(err.message, 'Something went wrong!', 'error')
        context.dispatch('fetchData')
      })
    },
  },
  getters: {
    tagFilter: (state) => (tag) => {
      return state.products.some(product => product.Tags.)
    }
  },
  modules: {
  }
})
