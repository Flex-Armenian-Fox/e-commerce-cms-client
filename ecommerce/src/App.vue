<template>
  <div id="app">
    <div class="home">
      <nav>
        <router-link to="/">Home</router-link><br>
        <router-link v-if="!isLoggedIn" to="/users">Users</router-link>
        <!-- <div v-else>
          <router-link to="/products">Products</router-link><br>
          <router-link @click.prevent="logoutUser" to="/">Logout</router-link><br>
        </div> -->
      </nav>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  methods: {
    // logoutUser () {
    //   localStorage.removeItem('accesstoken')
    //   this.checkAuth()
    //   this.$router.push('/').catch(() => {})
    // },
    checkAuth () {
      if (!localStorage.getItem('accesstoken')) {
        this.$store.commit('USER_LOGIN', false)
      } else {
        this.$store.commit('USER_LOGIN', true)
      }
    }
  },
  created () {
    this.checkAuth()
  },
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  }
}
</script>

<style src="./assets/tailwind.css"/>
