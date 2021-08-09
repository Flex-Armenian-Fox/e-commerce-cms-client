<template>
  <header>
    <div class="navbar navbar-dark bg-dark box-shadow">
            <div class="container d-flex justify-content-between">
            <router-link to="/" class="navbar-brand d-flex align-items-center">
                <strong>Commerce</strong>
            </router-link>
            <div class="ml-auto d-flex " id="top-btns" v-if="isLoggedIn">
                <button class="btn btn-danger" @click="logout">Logout</button>
                <Sidebar />
            </div>
            </div>
        </div>
    </header>
</template>

<script>
import router from '../router'
import Sidebar from './Sidebar.vue'
export default {
    components: {Sidebar},
    computed:{
         isLoggedIn() {return this.$store.state.isLoggedIn}
    },
    methods: {
        logout(){
            localStorage.clear()
            this.$store.commit('CHECK_LOGIN')
            router.push('/login')
        }
    }
}

</script>

<style>

</style>