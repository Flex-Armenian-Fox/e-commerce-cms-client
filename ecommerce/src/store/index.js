import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: false
    },
    mutations: {
        USER_LOGIN (state, payload) {
            state.isLoggedIn = payload
        }
    },
    actions: {

    },
    getters: {
        
    }
})