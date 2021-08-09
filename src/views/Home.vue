<template>
  <div class="home">
    <div class="d-flex flex-wrap justify-content-around">
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
    products() {
      if(this.$route.params.name) return this.$store.getters.tagFilter(this.$route.params.name)
      else return this.$store.state.products
    }
  },
  created() {
    this.$store.dispatch('fetchData')
  }
}
</script>
