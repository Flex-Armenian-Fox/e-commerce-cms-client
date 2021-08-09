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
          <button class="form-control btn-primary" type="submit">submit</button> <br> 
        </form>
        <label>New Tag:</label>
        <form @submit.prevent="postTag">
          <input type="text" v-model="newTag"><br>
          <button class="form-control btn-primary" type="submit">submit</button>
        </form>
        <p>tags</p>
        <div class="form-check">
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="delMode">
            <label class="form-check-label" for="flexSwitchCheckDefault">Delete mode</label>
        </div>
        <a :to="'/tag/'+tag.name" :class="'border rounded m-1 p-1 ' + mode" v-for="tag in tags" :key="tag.id" @click.prevent="tagContext(tag)">{{tag.name}}</a>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import router from '@/router'
import Swal from 'sweetalert2'
export default {
  data(){
    return {
      name: "",
      price: 0,
      stock: 0,
      image_url: "",
      newTag: "",
      delMode: 0
    }
  },
  methods: {
    postProduct() {this.$store.dispatch('postProduct', {name: this.name, price:this.price, stock:this.stock, image_url:this.image_url})},
    postTag() {this.$store.dispatch('postTag', {name: this.newTag})},
    tagContext(tag) {
      if(this.delMode) {
        Swal.fire({
                title: 'Delete Tag?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Commit'
            })
            .then((result) => {
                if(result.value){
                  this.$store.dispatch('delTag', tag.id)
                }
            })
        }
      else router.push('/tag/' + tag.name)
    }
  },
  computed: {
    tags() {return this.$store.state.tags}, 
    mode() {
      if(this.delMode) return 'border-danger text-danger'
      else return 'border-primary '
    },
  }
}
</script>

<style>

</style>