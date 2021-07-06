import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://localhost:3000'

export default new Vuex.Store({
  state: { },
  mutations: { },
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
        console.log(result.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
