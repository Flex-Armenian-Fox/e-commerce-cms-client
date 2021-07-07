<template>
  <div>
    <h2>List Category</h2>
    <Table border style="margin-left:4em;" :columns="categoryHeaders" :data="categories">
      <template slot-scope="{ row }" slot="name">
        <strong>{{ row.name }}</strong>
      </template>
      <template slot-scope="{ row }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(row)">Edit</Button>
        <Button type="error" size="small" @click="remove(row)">Delete</Button>
      </template>
    </Table>
    <DeleteModal
      :data="{ show: showModal, itemId, itemName, endpoints: 'deleteCategory' }"
      @cancelDelete="showModal = false"
    />
  </div>
</template>

<script>
import DeleteModal from '@/components/utils/DeleteModal.vue'

export default {
  components: { DeleteModal },
  data () {
    return {
      categoryName: '',
      editIndex: -1,
      displayModal: false,
      itemId: '',
      itemName: '',
      categoryHeaders: [
        {
          title: 'Category Name',
          key: 'category_name'
        },
        {
          title: 'Category Description',
          key: 'category_description'
        },
        {
          title: 'Action',
          slot: 'action',
          width: 150,
          align: 'center'
        }
      ]
    }
  },
  methods: {
    show (data) {
      this.$router.push(`/editcategory/${data.id}`)
    },
    remove (data) {
      this.showModal = true
      this.itemId = data.id
      this.itemName = data.category_name
    }
  },
  computed: {
    categories () {
      return this.$store.state.categories
    },
    showModal: {
      get () {
        return this.$store.state.displayDeleteModal
      },
      set (v) {
        return this.$store.commit('SET_DISPLAY_DELETE_MODAL', v)
      }
    }
  },
  created () {
    this.$store.dispatch('getCategories')
  }
}
</script>

<style>

</style>
