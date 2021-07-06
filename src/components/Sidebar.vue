<template>
  <div>
    <b-button v-b-toggle.sidebar-1>Admin Sidebar</b-button>
    <b-sidebar id="sidebar-1" title="Sidebar" shadow>
      <div class="px-3 py-2">
        <p>
          Add New Product
        </p>
        <form class="form-horizontal" @submit.prevent="postProduct">
          <div class="form-group">
              <label>Name:</label> <input type="text" v-model="name" />
              <label>Image url:</label> <input type="text" v-model="image_url" />
              <label>Price:</label> <input type="number" v-model="price"/><br>
              <label>Stock:</label> <input type="number" v-model="stock"/><br>
          </div>
          <button class="form-control btn-primary" type="submit">submit</button>
        </form>
        <p>Search by tags</p>
        <a class="border border-primary rounded m-1 p-1" v-for="tag in tags" :key="tag.id">{{tag.name}}</a>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
export default {
  data(){
    return {
      name: "",
      price: 0,
      stock: 0,
      image_url: ""
    }
  },
  methods: {
    postProduct() {this.$store.dispatch('postProduct', {name: this.name, price:this.price, stock:this.stock, image_url:this.image_url})}
  },
  computed: {
    tags() {return this.$store.state.tags} 
  }
}
</script>

<style>

</style>