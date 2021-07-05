<template>
  <div class="col-4 mx-auto my-4" id="login-block">
      <h1 class="text-3xl font-bold text-center">Log In</h1>
      <div class="text-md font-bold text-center text-red-700" id="login-error">{{errMsg}}</div>
      <form id="login-form" @submit.prevent="login">
        <div class="form-group">
          <label for="login-email">Email address</label>
          <input type="email" class="form-control" v-model="loginEmail" aria-describedby="emailHelp" placeholder="Email">
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input type="password" class="form-control" v-model="loginPassword" placeholder="Password">
        </div> <br>
        <button type="submit" class="btn btn-primary">Login</button> <button type="button" class="btn btn-secondary" @click="registerForm">Register</button>
        <p>or login with</p>
        <div v-if="!reg" id="google-signin-button"></div>
      </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginEmail: "",
            loginPassword: "",
            errMsg: "",
        }
    },
}
</script>

<style>

</style>