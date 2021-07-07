<template>

  <div id="app">
    <section class="bg-gradient-to-b from-indigo-900 to-gray-900">
      <div class="home">

        <div class="relative pt-0 sm:px-6 lg:px-8">

        <nav class="flex items-center justify-between sm:h-10 lg:justify-start" aria-label="Global">
          <div class="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
            <div class="flex items-center justify-between w-full md:w-auto">
              <router-link class="sr-only" v-if="!isLoggedIn" to="/users"></router-link>
            </div>
          </div>
        </nav>

        <router-view></router-view>
        </div>

      </div>
    </section>
  </div>

</template>

<script>
export default {
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
