<template>
  <div class="products">
    <h1 class="subtitle-1 grey--text">Products</h1>

    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 lg3 v-for="product in products" :key="product.id">
          <v-card flat class="text-xs ma-3">
            <v-responsive class="">
              <v-img :src="product.image_url"></v-img>
            </v-responsive>
            <v-card-text>
              <div class="d-flex justify-space-between">
                <div class="subtitle-1">{{ product.name }}</div>
                <v-menu bottom left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn icon v-bind="attrs" v-on="on">
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <EditForm :product="product"></EditForm>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title
                        ><a
                          @click.prevent="deleteProduct(product.id)"
                          class="black--text text-decoration-none"
                          href=""
                          >Delete</a
                        ></v-list-item-title
                      >
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div class="grey--text">{{ product.price }}</div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import EditForm from "../components/EditForm.vue";

export default {
  components: { EditForm },
  name: "Products",
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  methods: {
    deleteProduct(id) {
      this.$store.dispatch("deleteProduct", id);
    }
  },
  created() {
    this.$store.dispatch("fetchData");
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
