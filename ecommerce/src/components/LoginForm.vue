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
            this.$axios({
                method: 'POST',
                url: 'http://localhost:3000/users/login',
                data: {
                    email: this.email,
                    password: this.password
                }
            })
            .then(response => {
                console.log('INI RESPONSE userLogin ==> ', response)
                localStorage.setItem('accesstoken', response.data.accesstoken)
                this.$store.commit('USER_LOGIN', true)
                this.$router.push({ name: 'ProductsPage' }).catch(() => {})
            })
            .catch(err => {
                console.log('INI ERROR userLogin ==> ', err)
                console.log(err)
            })
        }
    }
}
</script>

<style></style>