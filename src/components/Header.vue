<template>
  <header>
    <div class="navbar navbar-dark bg-dark box-shadow">
            <div class="container d-flex justify-content-between">
            <a href="#" class="navbar-brand d-flex align-items-center">
                <strong>Commerce</strong>
            </a>
            <div class="ml-auto" id="top-btns" v-if="isLoggedIn">
                <button class="btn btn-success" @click="newTask">New Product</button>
                <button class="btn btn-danger" @click="logout">Logout</button>
            </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {

}

</script>

<style>

</style>