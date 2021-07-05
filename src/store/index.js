import Vue from 'vue'
import Vuex from 'vuex'
// import router from '../router'
import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    Products: [],
    ProductsFiltered: [],
  },
  mutations: {
    CHECK_LOGIN(state){
      if(localStorage.access_token) state.isLoggedIn=true
    }
  },
  actions: {
    Login(context, payload){
      console.log(context, payload)
      axios.post('http://localhost:3000/login', payload)
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.error(err); 
        })
    }
  },
  modules: {
  }
})
