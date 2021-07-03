<template>
  <div class="col-padding">
    <Col span="12">
      <Card>
        <p slot="title">Add New Product</p>
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
              <Option v-for="item in categories" :key="item.id" :value="item.id">{{item.category_name}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="createProduct">Save</Button>
            <Button style="margin-left:8px;" @click="$router.push('/products')">Cancel</Button>
          </FormItem>
        </Form>
      </Card>
    </Col>
  </div>
</template>

<script>
export default {
  name: 'AddProduct',
  data () {
    return {
      formAddProduct: {
        productName: '',
        productImg: '',
        productPrice: '',
        productStock: '',
        productCategory: ''
      },
      categories: []
    }
  },
  methods: {
    fetchCategory () {
      this.$axios({
        method: 'GET',
        url: '/categories',
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(({ data: response }) => {
        this.categories = response.data
      }).catch((err) => {
        console.log('error fetch category', err)
      })
    },
    createProduct () {
      this.$axios({
        method: 'POST',
        url: '/products',
        data: {
          name: this.formAddProduct.productName,
          image_url: this.formAddProduct.productImg,
          price: this.formAddProduct.productPrice,
          stock: this.formAddProduct.productStock,
          category_id: this.formAddProduct.productCategory
        },
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(() => {
        this.$Message.success(`Add product ${this.formAddProduct.productName} success`)
        this.$router.push('/products')
      }).catch((err) => {
        console.log('error create', err)
      })
    },
    checkFocus () {
      console.log('focus')
    }
  },
  created () {
    this.fetchCategory()
  }
}
</script>

<style>
  .col-padding {
    padding-top: 15px;
    margin-left: 5em;
  }
</style>
