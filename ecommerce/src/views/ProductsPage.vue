<template>
  <div>
    <nav>
      <router-link to="/products">Products</router-link><br>
      <!-- <router-link @click.prevent="logoutUser" to="/users">Logout</router-link><br> -->
      <a href="#" @click.prevent="logoutUser">Logout</a>
    </nav>

    <h2>Products Page</h2><br>
    <h4>List of Products</h4><br>
    <ProductTable :productsList="products"></ProductTable>
  </div>
</template>

<script>
import ProductTable from '../components/ProductTable.vue'

export default {
    name: 'ProductsPage',
    components: { 
      ProductTable
    },
    data () {
      return {
        products: []
      }
    },
    methods: {
      fetchProducts () {
        this.$axios({
          method: 'GET',
          url: 'http://localhost:3000/products/',
          headers: {accesstoken: localStorage.getItem('accesstoken')}
        })
        .then(({ data }) => {
          this.products = data
        })
        .catch(err => {
          console.log(err)
        })
      },
      logoutUser () {
        console.log('MASUK LOGOUT-USER !!!')
        localStorage.clear()
        this.$store.commit('USER_LOGIN', false)
        this.$router.push('/users').catch(() => {})
      }
    },
    created () {
      this.fetchProducts()
    },
    computed: {
      checkAuth () {
        return this.$store.getters.checkAuthX
      }
    }
}
</script>

<style>

</style>