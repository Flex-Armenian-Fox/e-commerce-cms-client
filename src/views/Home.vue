<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="d-flex justify-content-around">
      <Card v-for="item in products" :key="item.id" :item="item"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '@/components/Card'

export default {
  name: 'Home',
  components: {
    Card
  },
  computed: {
    products() {return this.$store.state.products}
  },
  created() {
    this.$store.dispatch('fetchData')
  }
}
</script>
