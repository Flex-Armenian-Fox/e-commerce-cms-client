<template>
  <div>
    <ProductForm :payload="editData"></ProductForm>
  </div>
</template>

<script>
import ProductForm from '@/components/products/ProductForm.vue'

export default {
  name: 'EditProduct',
  components: { ProductForm },
  data () {
    return {
      product: {},
      editData: {}
    }
  },
  methods: {
    fetchProduct (id) {
      this.$axios({
        method: 'GET',
        url: `/products/${id}`,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data: response }) => {
        this.product = response.data
        this.editData = {
          type: 'edit',
          title: 'Edit Product',
          data: this.product
        }
      }).catch((err) => {
        console.log('error fetchProduct', err)
      })
    }
  },
  created () {
    this.fetchProduct(this.$route.params.id)
  }
}
</script>

<style>

</style>
