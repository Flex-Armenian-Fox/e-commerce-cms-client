import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import iView from 'iview'
import router from '../router'

const axios = Axios.create({
  baseURL: 'https://antonp-ecommerce-server.herokuapp.com/api'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    categories: [],
    displayDeleteModal: false,
    formCategories: {
      category_name: '',
      category_desc: ''
    }
  },
  mutations: {
    SET_DISPLAY_DELETE_MODAL (state, payload) {
      state.displayDeleteModal = payload
    },

    SET_PRODUCTS (state, payload) {
      state.products = payload
    },

    SET_CATEGORIES (state, payload) {
      state.categories = payload
    },

    SET_FORM_CATEGORY (state, payload) {
      if (payload.is_add) {
        state.formCategories.category_name = ''
        state.formCategories.category_desc = ''
      } else {
        state.formCategories.category_name = payload.category_name
        state.formCategories.category_desc = payload.category_description
      }
    }
  },
  actions: {
    login (context, payload) {
      axios({
        method: 'POST',
        url: '/users/login',
        data: {
          email: payload.formLogin.email,
          password: payload.formLogin.password
        }
      }).then(({ data: response }) => {
        iView.Message.success('Login success')
        localStorage.setItem('access_token', response.data.access_token)
        router.push('/home').catch(() => {})
      }).catch(({ response }) => {
        const { error } = response.data
        iView.Message.error(error.message)
      })
    },

    getCategoryById (context, payload) {
      axios({
        method: 'GET',
        url: '/categories/' + payload.id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data: response }) => {
        context.commit('SET_FORM_CATEGORY', response.data)
      }).catch((err) => {
        console.log('error', err)
      })
    },

    createCategory (context, payload) {
      axios({
        method: 'POST',
        url: '/categories',
        data: {
          category_name: payload.categoryName,
          category_description: payload.categoryDesc
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(() => {
        iView.Message.success('Success Add New Category')
        context.commit('SET_DISPLAY_DELETE_MODAL', false)
        context.commit('SET_FORM_CATEGORY', { is_add: true })
        router.push('/category')
      }).catch((err) => {
        console.log('error createCategory', err)
      })
    },

    deleteCategory (context, payload) {
      axios({
        method: 'DELETE',
        url: `/categories/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(() => {
        iView.Message.success('Delete Success')
        this.dispatch('getCategories')
      }).catch((err) => {
        console.log('Error delete category', err)
      })
    },

    editCategory (context, payload) {
      axios({
        method: 'PUT',
        url: '/categories/' + payload.id,
        data: {
          category_name: payload.categoryName,
          category_description: payload.categoryDesc
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(() => {
        iView.Message.success('Update Success')
        router.push('/category')
      }).catch((err) => {
        console.log('error', err)
      })
    },

    getCategories (context, payload) {
      axios({
        method: 'GET',
        url: '/categories',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data: response }) => {
        context.commit('SET_CATEGORIES', response.data)
      }).catch((err) => {
        console.log('error fetch categories', err)
      })
    },

    getProducts (context, payload) {
      context.commit('SET_DISPLAY_DELETE_MODAL', false)
      axios({
        method: 'GET',
        url: '/products',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data: response }) => {
        const formattedData = [...response.data]
        formattedData.map(el => {
          el.price = el.price.toLocaleString()
          if (!el.Category) {
            el.Category = { category_name: 'N/A' }
          }
          return el
        })
        context.commit('SET_PRODUCTS', formattedData)
      }).catch((err) => {
        console.log('error fetch', err)
      })
    },

    createProduct (context, payload) {
      const { httpMethod, httpUrl, formAddProduct, dialogMessage } = payload
      axios({
        method: httpMethod,
        url: httpUrl,
        data: {
          name: formAddProduct.productName,
          image_url: formAddProduct.productImg,
          price: formAddProduct.productPrice,
          stock: formAddProduct.productStock,
          category_id: formAddProduct.productCategory
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(() => {
        iView.Message.success(dialogMessage)
        router.push('/products')
      }).catch((err) => {
        console.log('error createProduct', err)
      })
    },

    deleteProduct (context, payload) {
      axios({
        method: 'DELETE',
        url: `/products/${payload.id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(() => {
        iView.Message.success('Delete Success')
        this.dispatch('getProducts')
      }).catch((err) => {
        console.log('Error delete product', err)
      })
    }
  },
  getters: {}
})
