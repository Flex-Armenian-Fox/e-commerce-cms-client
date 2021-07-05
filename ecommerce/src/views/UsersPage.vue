<template>
  <div>
      <!-- LOGIN FORM COMPONENT here -->
      <LoginForm></LoginForm>
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