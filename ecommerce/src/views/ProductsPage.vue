<template>
  <div>
    <nav>
      <router-link to="/products">Products</router-link><br>
      <!-- <router-link @click.prevent="logoutUser" to="/users">Logout</router-link><br> -->
      <a href="#" @click.prevent="logoutUser">Logout</a>
    </nav>

    <h2>Products Page</h2><br>
    <h4>List of Products</h4><br>
    <button @click="toAddProduct">+ Add Product</button>
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
    computed: {
      checkAuth () {
        return this.$store.getters.checkAuthX
      },
      products () {
        return this.$store.state.products
      }
    },
    methods: {
      fetchProducts () {
        this.$store.dispatch('fetchProducts')
      },
      logoutUser () {
        this.$store.dispatch('userLogout')
      },
      toAddProduct () {
        this.$router.push({ name: 'CreateProduct' })
      }
    },
    created () {
      this.fetchProducts()
    }
}
</script>

<style>

</style>