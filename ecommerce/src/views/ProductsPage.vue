<template>
  <div class="min-h-screen pt-2 px-4 sm:px-6 lg:px-4">

    <div class="mb-6">
      <nav class="flex lg:justify-start my-4" aria-label="Global">
        
        <div class="hidden md:block md:pr-4 md:space-x-8">
          <a href="#" class="font-bold text-gray-200 hover:text-gray-400 tracking-wider uppercase">Products</a>
          <a href="#" @click.prevent="logoutUser" class="font-bold text-yellow-500 hover:text-yellow-400 tracking-wider uppercase">Log out</a>
        </div>
        
      </nav>
    </div>

    <span class="mx-2">
      <button @click="showAddProductForm" type="button" class="inline-flex items-center px-4 py-2 transition duration-150 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
        <!-- Heroicon name: solid/check -->
        <svg xmlns="http://www.w3.org/2000/svg" class="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Add Product
      </button>
    </span>

    <AddProductForm v-if="addProductForm"></AddProductForm>

    <ProductTable :productsList="products"></ProductTable>
    
    <EditProductForm v-if="editProductForm"></EditProductForm>

  </div>
</template>

<script>
import ProductTable from '../components/ProductTable.vue'
import AddProductForm from '../components/AddProductForm.vue'
import EditProductForm from '../components/EditProductForm.vue'

export default {
    name: 'ProductsPage',
    components: { 
      ProductTable,
      AddProductForm,
      EditProductForm
    },
    computed: {
      products () {
        return this.$store.state.products
      },
      addProductForm () {
        return this.$store.state.productForm
      },
      editProductForm () {
        return this.$store.state.editForm
      }
    },
    methods: {
      fetchProducts () {
        this.$store.dispatch('fetchProducts')
      },
      logoutUser () {
        this.$store.dispatch('userLogout')
      },
      showAddProductForm () {
        this.$store.dispatch('showAddProductForm')
      }
    },
    created () {
      this.fetchProducts()
    }
}
</script>

<style>

</style>