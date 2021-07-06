<template>
  <div class="col-padding">
    <Col span="12">
      <Card>
        <p slot="title">{{formAddProduct.pageTitle}}</p>
        <Form :model="formAddProduct" :label-width="100">
          <FormItem label="Product Name" >
            <Input v-model="formAddProduct.productName" placeholder="e.g Kawasaki Ninja" />
          </FormItem>
          <FormItem label="Image URL">
            <Input v-model="formAddProduct.productImg">
              <span slot="prepend">http://</span>
            </Input>
          </FormItem>
          <FormItem label="Product Price">
            <Input v-model="formAddProduct.productPrice" type="number">
              <span slot="prepend">IDR</span>
            </Input>
          </FormItem>
          <FormItem label="Product Stock">
            <Input v-model="formAddProduct.productStock" type="number"></Input>
          </FormItem>
          <FormItem label="Product Category">
            <Select v-model="formAddProduct.productCategory" clearable>
              <Option
                v-for="item in categories"
                :key="item.id"
                :value="item.id"
                :selected="item.category_id == formAddProduct.productCategory"
              >{{item.category_name}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="createProduct(formAddProduct.pageAction, formAddProduct.productId)">Save</Button>
            <Button style="margin-left:8px;" @click="$router.push('/products')">Cancel</Button>
          </FormItem>
        </Form>
      </Card>
    </Col>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  props: ['payload'],
  computed: {
    categories () {
      return this.$store.state.categories
    },

    formAddProduct () {
      const data = this.payload ? this.payload.data : null
      let productCategory = ''

      if (data && data.Category) {
        productCategory = data.Category.id
      }

      return {
        productName: data ? data.name : '',
        productImg: data ? data.image_url : '',
        productPrice: data ? data.price : '',
        productStock: data ? data.stock : '',
        productCategory: productCategory,
        pageTitle: this.payload ? this.payload.title : 'Add New Product',
        pageAction: this.payload ? 'Edit' : 'Create',
        productId: data ? data.id : ''
      }
    }
  },
  methods: {
    createProduct (action, id) {
      let httpMethod = null
      let httpUrl = null
      let dialogMessage = ''

      if (action === 'Edit') {
        httpMethod = 'PUT'
        httpUrl = '/products/' + id
        dialogMessage = 'Update Success'
      } else {
        httpMethod = 'POST'
        httpUrl = '/products'
        dialogMessage = `Add product ${this.formAddProduct.productName} success`
      }

      this.$store.dispatch('createProduct', {
        httpMethod, httpUrl, dialogMessage, formAddProduct: this.formAddProduct
      })
    }
  },
  created () {
    this.$store.dispatch('getCategories')
  }
}
</script>

<style>
  .col-padding {
    padding-top: 15px;
    margin-left: 5em;
  }
</style>
