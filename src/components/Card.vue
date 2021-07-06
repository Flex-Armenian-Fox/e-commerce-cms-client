<template>
  <div class="m-1">
  <b-card
    :img-src="item.image_url || 'https://cdn.discordapp.com/attachments/583880464784424960/851801611738415164/image0.jpg'"
    img-alt="Image"
    img-top
    style="max-width: 20rem;"
    class="mb-2"
  >
    <form class="form" @submit.prevent="putProduct">
        <div class="row my-2">
            <label>Name:</label> <input type="text" class="form-control" v-model="item.name" />
        </div>
        <div class="row my-2">
            <label>Image url:</label> <input type="text" class="form-control" v-model="item.image_url" /> 
        </div>
        <div class="row my-2">
            <label>Price:</label> <input type="number" class="form-control" v-model="item.price"/>
        </div>
        <div class="row my-2">
            <label>Stock:</label> <input type="number" class="form-control" v-model="item.stock"/>
        </div>
        <div class="d-flex justify-content-between">
            <button class="form-control btn-primary" type="submit">submit</button>
            <button class="form-control btn-danger" @click="delProduct">delete</button>
        </div>
    </form>
    <br>
    <a class="border border-primary rounded m-1 p-1" v-for="tag in item.Tags" :key="tag.name">{{tag.name}}</a>
  </b-card>
</div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    props: ["item"],
    methods: {
        putProduct(){
            Swal.fire({
                title: 'Commit Changes?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Commit'
            })
            .then((result) => {
                if(result.value){
                    this.$store.dispatch('putProduct', this.item)
                }
            })
        },
        delProduct(){
            Swal.fire({
                title: 'Delete product?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete'
            })
            .then((result) => {
                if(result.value){
                    this.$store.dispatch('delProduct', this.item.id)
                }
            })
        }
    }
}
</script>

<style>

</style>