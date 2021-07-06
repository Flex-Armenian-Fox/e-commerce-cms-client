<template>
  <div>
      <br>
      <h2>Login Here</h2>
      <form>

        <label for="email">Email</label>
        <input type="text" v-model="email" id="email" placeholder="Your email here"/><br>

        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" placeholder="Your password here"/><br>

        <button @click.prevent="userLogin" type="submit">Login</button>
      </form>
  </div>
</template>

<script>
export default {
    name: 'LoginForm',
    data () {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        userLogin() {
            const input = {email: this.email, password: this.password}
            this.$store.dispatch('userLogin', input)
        }
    }
}
</script>

<style></style>