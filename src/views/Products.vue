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
  data() {
    return {
      products: []
    };
  },
  methods: {
    fetchData() {
      this.$axios({
        method: "GET",
        url: "/products",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI1MzI5MjczfQ.7ytvi2U-ecdsF65T4jAu5-VG9EeqhZiogCivvfqPQm0"
        }
      })
        .then(result => {
          console.log(result);
          this.products = result.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteProduct(id) {
      console.log(id);
      this.$axios({
        method: "DELETE",
        url: "/products/" + id,
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI1MzI5MjczfQ.7ytvi2U-ecdsF65T4jAu5-VG9EeqhZiogCivvfqPQm0"
        }
      })
        .then(result => {
          console.log(result);
          this.fetchData();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
