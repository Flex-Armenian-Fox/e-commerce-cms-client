<template>
  <div id="app">
    <div class="home">
      <nav>
        <router-link v-if="!isLoggedIn" to="/users">Users</router-link>
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
  computed: {
    isLoggedIn () {
      return this.$store.state.isLoggedIn
    }
  },
  methods: {
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
  }
}
</script>

<style src="./assets/tailwind.css"/>
