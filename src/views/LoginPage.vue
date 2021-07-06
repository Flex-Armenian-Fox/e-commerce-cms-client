<template>
    <div class="jumbotron d-flex align-items-center min-vh-100">
        <form class="col-lg-3" @submit.prevent="login">
            <h3>Login</h3>

            <div class="form-group">
                <label>Email address</label>
                <input v-model="email" type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Login</button>
            <br>
            <div class="social-icons">
                <ul>
                    <li><a href="#"><i class="fa fa-google"></i></a></li>
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                </ul>
            </div>
        </form>
        <div class="col-lg-6">
            <img src="../assets/photos/signin.jpg" alt="Login Image">
        </div>
    </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      // console.log('MASUK', this)
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
