<template>
  <div class="dashboard">
    <h1 class="subtitle-1 grey--text">Dashboard</h1>

    <v-container class="my-5">
      <v-card max-width="600px" class="mx-auto">
        <v-card-title>
          <h3>Add a New Product</h3>
        </v-card-title>
        <v-card-text>
          <v-form class="px-3">
            <v-responsive>
              <v-img :src="image_url" :class="{ 'd-none': !image }"></v-img>
            </v-responsive>
            <v-file-input
              accept="image/*"
              label="Image"
              @change="loadFile($event)"
              v-model="image"
            ></v-file-input>
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
              class=""
              label="URL"
              v-model="image_url"
            ></v-text-field>
            <v-btn class="mr-4" @click="submit">
              submit
            </v-btn>
            <v-btn @click="clear">
              clear
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      name: "",
      price: "",
      stock: "",
      image_url: "",
      select: null,
      items: ["T-Shirts", "Shirts", "Pants", "Outers", "Accessories"],
      image: null,
      file: ""
    };
  },
  methods: {
    submit() {
      const formData = new FormData();
      formData.append("file", this.file);

      this.$axios
        .post("products/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(result => {
          console.log(result);
          this.clear();
        })
        .catch(err => {
          console.log(err);
        });

      this.$axios({
        method: "POST",
        url: "/products",
        headers: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI1MzI5MjczfQ.7ytvi2U-ecdsF65T4jAu5-VG9EeqhZiogCivvfqPQm0"
        },
        data: {
          name: this.name,
          price: this.price,
          stock: this.stock,
          image_url: this.image_url,
          category: this.select
        }
      })
        .then(result => {
          console.log(result);
          this.clear();
        })
        .catch(err => {
          console.log(err);
        });
    },
    clear() {
      // this.$v.$reset();
      this.name = "";
      this.price = "";
      this.stock = "";
      this.image_url = "";
      this.select = null;
      this.image = null;
    },
    loadFile(event) {
      this.image_url = URL.createObjectURL(this.image);
      this.file = event;
      // console.log(this.image);
      // console.log(this.file);
      // image.removeAttribute("style");
    }
  }
};
</script>
