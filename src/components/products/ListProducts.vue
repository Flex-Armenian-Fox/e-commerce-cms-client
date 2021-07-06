<template >
  <div>
    <Col span="6" v-for="item in products" :key="item.id" class="col-padding">
      <Card :bordered="true">
        <p slot="title">{{item.name}}</p>
        <div>
          <img v-bind:src="item.image_url" height="200vh" width="200vw" />
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
          <Divider />
          <span>
            <Button
              @click="navigate('edit', item.id)"
              style="margin-left: 0px"
              :size="buttonSize"
              icon="ios-create-outline"
              type="primary"
              shape="circle"
            ></Button>
            <Button
              @click="navigate('delete', item)"
              style="margin-left: 8px"
              :size="buttonSize"
              icon="ios-trash-outline"
              type="error"
              shape="circle"
            ></Button>
          </span>
        </div>
      </Card>
    </Col>
    <DeleteModal
      :data="{ show: showModal, itemId, itemName }"
      @cancelDelete="showModal = false"
    />
  </div>
</template>

<script>
import DeleteModal from '@/components/utils/DeleteModal.vue'

export default {
  name: 'ListProducts',
  components: { DeleteModal },
  data () {
    return {
      buttonSize: 'default',
      itemId: '',
      itemName: ''
    }
  },
  computed: {
    showModal: {
      get () {
        return this.$store.state.displayDeleteModal
      },
      set (v) {
        return this.$store.commit('SET_DISPLAY_DELETE_MODAL', v)
      }
    },
    products () {
      return this.$store.state.products
    }
  },
  methods: {
    navigate (to, data) {
      switch (to) {
        case 'edit':
          this.$router.push(`/editproduct/${data}`)
          break
        case 'delete':
          this.showModal = true
          this.itemId = data.id
          this.itemName = data.name
          break
        default:
          break
      }
    }
  },
  created () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style>
  .col-padding {
    padding-top: 2em;
    margin-left: 4em;
  }
</style>
