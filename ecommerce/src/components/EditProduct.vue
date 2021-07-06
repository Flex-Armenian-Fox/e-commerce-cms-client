<template>
  <div>
      <h1 class="text-indigo-500">EDIT PRODUCT FORM</h1><br>
      <form action="">
        <label for="name">Name</label>
        <input v-model="name" type="text" id="name" placeholder="Product name"/><br>

        <label for="image_url">Image URL</label>
        <input v-model="image_url" type="text" id="image_url" placeholder="Paste image URL here"/><br>

        <label for="price">Price</label>
        <input v-model="price" type="number" id="price" min="500"/><br>

        <label for="stock">Stock</label>
        <input v-model="stock" type="number" id="stock" min="1"/><br>

        <button @click.prevent="submitEdit" type="submit">Confirm Edit</button><br>
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
        stock: 0,
        productId: 0
      }
    },
    methods: {
      backToProducts () {
        this.$router.push({ name: 'ProductsPage' })
      },
      submitEdit () {
        const payload = {
          productId: this.productId,
          name: this.name,
          image_url: this.image_url,
          price: this.price,
          stock: this.stock
        }
        this.$store.dispatch('editProduct', payload)
      }
    },
    created () {
      this.name = this.$store.state.currentProduct.product.name
      this.image_url = this.$store.state.currentProduct.product.image_url
      this.price = this.$store.state.currentProduct.product.price
      this.stock = this.$store.state.currentProduct.product.stock
      this.productId = this.$store.state.currentProduct.product.id
    }
}
</script>

<style>

</style>