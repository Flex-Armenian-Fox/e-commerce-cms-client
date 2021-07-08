    <template>
    <div>
        <b-card header-tag="header">
            <template #header>
                <h6 class="mb-0">Add New Category</h6>
            </template>
            <b-form @submit.prevent="onSubmit" @reset.prevent="onCancel">
            <b-form-group
                id="input-group-1"
                label="Category Name:"
                label-for="input-1"
                description="For using at product category"
            >
                <b-form-input
                id="input-1"
                v-model="name"
                placeholder="Enter category name"
                required
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Cancel</b-button>
            </b-form>
        </b-card>
  </div>
</template>

<script>
export default {
  name: 'CategoryForm',
  data () {
    return {
      name: ''
    }
  },
  computed: { },
  methods: {
    onSubmit () {
      this.$store.dispatch('addCategory', {
        name: this.name
      })

      this.$router.push('/categories')
    },
    onCancel () {
      this.$router.push('/categories')
    }
  },
  created () { }
}
</script>
