import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLoggedIn: false,
        products: [],
        currentProduct: {},
        productForm: false,
        editForm: false
    },
    mutations: {
        USER_LOGIN (state, payload) {
            state.isLoggedIn = payload
        },
        USER_LOGOUT (state, payload) {
            state.isLoggedIn = payload
        },
        SET_PRODUCTS (state, payload) {
            state.products = payload
        },
        SET_CURRENT_PRODUCT (state, payload) {
            state.currentProduct = payload
        },
        SET_PRODUCT_FORM (state, payload) {
            state.productForm = payload
        },
        SET_EDIT_FORM (state, payload) {
            state.editForm = payload
        }
    },
    actions: {
        userLogin ({ commit }, payload) {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/login',
                data: payload
            })
            .then(response => {
                localStorage.setItem('accesstoken', response.data.accesstoken)
                commit('USER_LOGIN', true)
                router.push({ name: 'ProductsPage' }).catch(() => {})
            })
            .catch(err => {
                console.log(err)
            })
        },
        userLogout ({ commit }) {
            localStorage.clear()
            commit('USER_LOGOUT', false)
            router.push({ name: 'UsersPage' }).catch(() => {})
        },
        fetchProducts ({ commit }) {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/products/',
                headers: {accesstoken: localStorage.getItem('accesstoken')}
            })
            .then(({ data }) => {
                commit('SET_PRODUCTS', data.products)
            })
            .catch(err => {
                console.log(err)
            })
        },
        createProduct ({ commit, dispatch }, payload) {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/products/',
                data: payload,
                headers: {accesstoken: localStorage.getItem('accesstoken')}
            })
            .then(() => {
                commit('SET_PRODUCT_FORM', false)
                dispatch('fetchProducts')
                // router.push({ name: 'ProductsPage' }).catch(() => {})
            })
            .catch(err => {
                console.log(err)
            })
        },
        deleteProduct ({ dispatch }, productId) {
            axios({
                method: 'DELETE',
                url: 'http://localhost:3000/products/' + productId,
                headers: {accesstoken: localStorage.getItem('accesstoken')}
            })
            .then(() => {
                dispatch('fetchProducts')
            })
            .catch(err => {
                console.log(err)
            })
        },
        fetchOneProduct ({ commit }, productId) {
            axios({
                method: 'GET',
                url: 'http://localhost:3000/products/' + productId,
                headers: {accesstoken: localStorage.getItem('accesstoken')}
            })
            .then(response => {
                commit('SET_CURRENT_PRODUCT', response.data)
                commit('SET_EDIT_FORM', true)
                // router.push({ name: 'EditProduct' }).catch(() => {})
            })
        },
        editProduct ({ commit, dispatch }, payload) {
            const {productId, name, image_url, price, stock} = payload
            axios({
                method: 'PUT',
                url: 'http://localhost:3000/products/' + productId,
                data: {name, image_url, price, stock},
                headers: {accesstoken: localStorage.getItem('accesstoken')}
            })
            .then(response => {
                commit('SET_EDIT_FORM', false)
                dispatch('fetchProducts')
            })
            .catch(err => {
                console.log(err)
            })
        },
        showAddProductForm ({ commit }) {
            commit('SET_PRODUCT_FORM', true)
        },
        hideAddProductForm ({ commit }) {
            commit('SET_PRODUCT_FORM', false)
        },
        // showEditForm ({ commit }) {
        //     commit('SET_EDIT_FORM', true)
        // },
        hideEditForm ({ commit }) {
            commit('SET_EDIT_FORM', false)
        }
    },
    getters: {

    }
})