import Vue from 'vue'
import App from './App.vue'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(iView)
Vue.prototype.$axios = axios.create({
  baseURL: 'http://localhost:3000/api'
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
