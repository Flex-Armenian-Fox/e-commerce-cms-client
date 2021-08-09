<template>
  <div class="m-1">
  <b-card
    :img-src="item.image_url || 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png'"
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
            <button type="button" class="form-control btn-danger" @click="delProduct">delete</button>
        </div>
    </form>
    <br>
    <select v-model="newTag" @change="addTag">
        <option value="" selected>---add tag---</option>
        <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{tag.name}}</option>
    </select>
    <div class="form-check">
        <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" v-model="delMode">
        <label class="form-check-label" for="flexSwitchCheckDefault">Delete mode</label>
    </div>
    <a :class="'border rounded m-1 p-1 ' + mode" v-for="tag in item.Tags" @click="tagContext(tag)" :key="tag.name">{{tag.name}}</a>
  </b-card>
</div>
</template>

<script>
import Swal from 'sweetalert2'
import router from '@/router'
export default {
    props: ["item"],
    data() {
        return {
            delMode: 0,
            newTag: ""
        } 
    },
    computed: {
        mode() {
            if(this.delMode) return 'border-danger text-danger'
            else return 'border-primary '
        },
        tags() {return this.$store.state.tags}
    },
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
                        this.$store.dispatch('delTagLi', tag)
                        }
                    })
                }
            else router.push('/tag/' + tag.name)
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
        },
        addTag(){
            if(this.newTag) {this.$store.dispatch('addTagLi', {productId: this.item.id, tagId: this.newTag})}
        }
    }
}
</script>

<style>

</style>