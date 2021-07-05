<template>
  <div id="app">
    <Header />
    <Sidebar />
    <router-view/>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header'

export default {
  name: 'App',
  components: {
    Sidebar,
    Header
  },
  computed: {
    isLoggedIn() {return this.$store.state.isLoggedIn}
  },
  created() {
    this.$store.commit("CHECK_LOGIN")
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
