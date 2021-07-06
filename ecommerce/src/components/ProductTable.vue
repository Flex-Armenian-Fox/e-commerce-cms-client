<template>
  <div>
      <table>
          <thead>
              <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th colspan="2" >Actions</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(product, index) in productsList" :key="product.id">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ product.name }}</td>
                <td>{{ product.imageUrl }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.stock }}</td>
                <td>
                    <button @click.prevent="editProduct(product.id)" >Edit</button>
                </td>
                <td>
                    <button @click.prevent="deleteProduct(product.id)">Delete</button>
                </td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    name: 'ProductTable',
    props: ['productsList'],
    methods: {
        editProduct (productId) {
            this.$store.dispatch('fetchOneProduct', productId)
        },
        deleteProduct (productId) {
            this.$store.dispatch('deleteProduct', productId)
        }
    }
}
</script>

<style>

</style>