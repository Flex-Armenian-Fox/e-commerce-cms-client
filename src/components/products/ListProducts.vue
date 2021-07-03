<template >
  <div class="col-padding">
    <div >
      <Col span="6" v-for="item in products" :key="item.id">
        <Card :bordered="true">
          <p slot="title">{{item.name}}</p>
          <div>
            <img v-bind:src="item.image_url" width="270px" />
            <Divider />
            <span style="text-align:left;">
              <p><Icon type="ios-cash" /> <b>Price : </b> {{item.price}}</p>
            </span>
            <span style="text-align:left;">
              <p><Icon type="md-cube" /> <b>Stock : </b> {{item.stock}}</p>
            </span>
            <span style="text-align:left;">
              <p><Icon type="md-pricetag" /> <b>Category : </b> {{item.Category.category_name}}</p>
            </span>
          </div>
        </Card>
      </Col>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListProducts',
  data () {
    return {
      products: []
    }
  },
  methods: {
    fetchProduct () {
      this.$axios({
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
        this.products = formattedData
      }).catch((err) => {
        console.log('error fetch', err)
      })
    }
  },
  created () {
    this.fetchProduct()
  }
}
</script>

<style>
  .col-padding {
    padding-top: 2em;
    margin-left: 5em;
  }
</style>
