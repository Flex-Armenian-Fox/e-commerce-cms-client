<template>
  <div>
      <h1 class="text-indigo-500">PRODUCT FORM HERE</h1><br>
      <form action="">
        <label for="name">Name</label>
        <input v-model="name" type="text" id="name" placeholder="Product name"/><br>

        <label for="image_url">Image URL</label>
        <input v-model="image_url" type="text" id="image_url" placeholder="Paste image URL here"/><br>

        <label for="price">Price</label>
        <input v-model="price" type="number" id="price" min="500"/><br>

        <label for="stock">Stock</label>
        <input v-model="stock" type="number" id="stock" min="1"/><br>

        <button @click.prevent="createProduct" type="submit">Add Product</button><br>
        <button @click.prevent="backToProducts">Cancel</button>
      </form>
  </div>
</template>

<script>
export default {
    name: 'ProductForm',
    data () {
      return {
        name: '',
        image_url: '',
        price: 0,
        stock: 0
      }
    },
    methods: {
      createProduct () {
        this.$store.dispatch('createProduct', {
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock
        })
      },
      backToProducts () {
        this.$router.push({ name: 'ProductsPage' })
      }
    }
}
</script>

<style>

</style>