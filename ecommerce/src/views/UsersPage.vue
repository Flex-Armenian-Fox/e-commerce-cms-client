<template>
  <div>
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">

      <!-- LOGIN FORM COMPONENT here -->
      <LoginForm></LoginForm>

      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'

export default {
    name: 'UsersPage',
    components: {
      LoginForm
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

<style>

</style>