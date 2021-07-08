    <template>
    <div>
        <b-card header-tag="header">
            <template #header>
                <h6 class="mb-0">Add New Product</h6>
            </template>
            <b-form @submit.prevent="onSubmit" @reset.prevent="onCancel">
            <b-form-group
                id="input-group-1"
                label="Product Name:"
                label-for="input-1"
            >
                <b-form-input
                id="input-1"
                v-model="name"
                placeholder="Enter Product name"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-2"
                label="Image URL :"
                label-for="input-2"
            >
                <b-form-input
                id="input-2"
                v-model="image_url"
                placeholder="Enter Image URL Location"
                type="url"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-3"
                label="Price :"
                label-for="input-3"
            >
                <b-form-input
                id="input-3"
                v-model="price"
                type="number"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                id="input-group-4"
                label="Stock :"
                label-for="input-4"
            >
                <b-form-input
                id="input-4"
                v-model="stock"
                type="number"
                ></b-form-input>
            </b-form-group>

            <!-- <b-form-group
                id="input-group-5"
                label="Category :"
                label-for="input-5"
            >
             <b-form-select v-model="category" :options="options"></b-form-select>
            </b-form-group> -->

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Cancel</b-button>
            </b-form>
        </b-card>
  </div>
</template>

<script>
export default {
  name: 'ProductForm',
  data () {
    return {
      name: '',
      image_url: '',
      price: 0,
      stock: 0,
      categoryid: null
    }
  },
  computed: { },
  methods: {
    onSubmit () {
      this.$store.dispatch('addProduct', {
        name: this.name,
        image_url: this.image_url,
        price: this.price,
        stock: this.stock,
        categoryid: this.categoryid
      })

      this.$router.push('/products')
    },
    onCancel () {
      this.$router.push('/products')
    }
  },
  created () { }
}
</script>
