<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text text--darken-2">Dashboard</h1>

    <v-container class="my-5">
      <v-card max-width="600px" class="mx-auto mb-7 px-3">
        <v-card-title class="grey--text text--darken-2">
          <h3>Add a New Product</h3>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-carousel height="100%" :class="{ 'd-none': !image }">
              <v-carousel-item
                v-for="(url, i) in image_url"
                :key="i"
                :src="url"
              ></v-carousel-item>
            </v-carousel>
            <!-- <v-responsive>
              <v-img :src="image_url[0]" :class="{ 'd-none': !image }"></v-img>
            </v-responsive> -->
            <v-file-input
              multiple
              accept="image/*"
              label="Image"
              @change="loadFile($event)"
              v-model="image"
            >
              <template v-slot:selection="{ text }">
                <v-chip small label>
                  {{ text }}
                </v-chip>
              </template>
            </v-file-input>
            <v-text-field label="Name" v-model="name"></v-text-field>
            <v-text-field
              type="number"
              prefix="Rp"
              label="Price"
              v-model="price"
            ></v-text-field>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  type="number"
                  suffix="pcs"
                  label="Stock"
                  v-model="stock"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  v-model="select"
                  :items="items"
                  label="Category"
                  required
                ></v-select>
              </v-col>
            </v-row>
            <v-text-field
              class="d-none"
              label="URL"
              v-model="image_url"
            ></v-text-field>
            <v-btn
              :loading="loading == 'wait'"
              dark
              color="grey darken-4"
              class="mr-4"
              @click="submit"
            >
              add
            </v-btn>
            <span v-if="loading == 'wait'">New product adding ...</span>
            <v-btn
              v-if="loading != 'wait'"
              dark
              color="grey darken-4"
              @click="clear"
            >
              clear
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>

    <v-alert
      v-if="loading == 'done'"
      dense
      text
      type="success"
      class="mx-auto"
      max-width="600px"
    >
      Successfully added new product
    </v-alert>
    <v-layout row wrap class="mx-3">
      <v-flex xs12 sm6 lg3 v-for="product in products" :key="product.id">
        <v-card flat class="text-xs ma-3">
          <v-carousel height="100%">
            <v-carousel-item
              v-for="(url, i) in images_url"
              :key="i"
              :src="product[url]"
              v-if="product[url] != ''"
            ></v-carousel-item>
          </v-carousel>
          <!-- <v-responsive class="">
            <v-img :src="product.image_url1"></v-img>
          </v-responsive> -->
          <v-card-text>
            <div class="d-flex justify-space-between">
              <div class="subtitle-1">{{ product.name }}</div>
              <v-menu left offset-x>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="() => {}">
                    <v-list-item-title>
                      <EditForm :product="product"></EditForm>
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="() => {}">
                    <v-list-item-title
                      @click.stop="deleteDialog = true"
                      class="black--text text-decoration-none"
                      >Delete</v-list-item-title
                    >
                  </v-list-item>
                  <v-dialog v-model="deleteDialog" max-width="290">
                    <v-card>
                      <v-card-title class="text-h5">
                        Are you sure you want to delete
                        {{ product.name }} from products?
                      </v-card-title>

                      <v-card-text class="red--text text--darken-1">
                        Delete action cannot be undone!
                      </v-card-text>

                      <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn text @click="deleteDialog = false">
                          No
                        </v-btn>

                        <v-btn
                          color="green darken-1"
                          text
                          @click="deleteProduct(product.id)"
                        >
                          Yes, sure
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-list>
              </v-menu>
            </div>
            <div class="grey--text">Rp. {{ product.price }}</div>
            <div class="grey--text">Stock: {{ product.stock }} pcs</div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import EditForm from "../components/EditForm.vue";

export default {
  name: "Dashboard",
  components: { EditForm },
  data() {
    return {
      name: "",
      price: "",
      stock: "",
      image_url: [],
      images_url: [
        "image_url1",
        "image_url2",
        "image_url3",
        "image_url4",
        "image_url5"
      ],
      select: null,
      items: ["T-Shirts", "Shirts", "Pants", "Outers", "Accessories"],
      image: null,
      files: "",
      deleteDialog: false
    };
  },
  computed: {
    products() {
      return this.$store.getters.dashboard;
    },
    loading() {
      return this.$store.state.loading;
    }
  },
  methods: {
    submit() {
      this.$store.commit("SET_LOADING", "wait");
      this.$store
        .dispatch("addProduct", {
          name: this.name,
          price: this.price,
          stock: this.stock,
          image_url: this.image_url,
          category: this.select,
          files: this.files
        })
        .then(() => this.clear());
    },
    clear() {
      // this.$v.$reset();
      this.name = "";
      this.price = "";
      this.stock = "";
      this.image_url = [];
      this.select = null;
      this.image = null;
    },
    loadFile(event) {
      if (event && event.length == 0) {
        this.image = null;
        this.image_url = [];
        this.files = "";
      } else if (event && event.length > 0) {
        this.image_url = [];
        this.image.forEach(el => {
          this.image_url.push(URL.createObjectURL(el));
        });
        this.files = event; // array
      }
    },
    deleteProduct(id) {
      this.$store.dispatch("deleteProduct", id);
      this.deleteDialog = false;
    }
  },
  created() {
    this.$store.dispatch("fetchData");
    this.$store.commit("SET_LOADING", "");
  }
};
</script>
