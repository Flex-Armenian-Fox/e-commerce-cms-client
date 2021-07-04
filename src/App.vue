<template>
  <v-app class="grey lighten-4">
    <v-main class="grey lighten-4">
      <Nav />
      <div class="mx-4 mb-4">
        <router-view></router-view>
      </div>
    </v-main>
  </v-app>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  components: { Nav },
  name: "App",
  data() {
    return {};
  }
};
</script>
