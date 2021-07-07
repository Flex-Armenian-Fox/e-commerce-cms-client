<template>
  <div class="col-padding">
    <Col span="12">
      <Card>
        <p slot="title" v-if="$route.params.id">Edit Category</p>
        <p slot="title" v-else-if="!$route.params.id">Add Category</p>
        <Form :model="formCategories" :label-width="120">
          <FormItem label="Category Name" >
            <Input v-model="formCategories.category_name" placeholder="e.g Kawasaki Ninja" />
          </FormItem>
          <FormItem label="Category Description">
            <Input v-model="formCategories.category_desc" placeholder="e.g Kawasaki Ninja" />
          </FormItem>
          <FormItem>
            <Button v-if="$route.params.id" type="primary" @click="categoryAction('Edit')">Save</Button>
            <Button v-else-if="!$route.params.id" type="primary" @click="categoryAction('Add')">Add</Button>
            <Button style="margin-left:8px;" @click="$router.push('/category')">Cancel</Button>
          </FormItem>
        </Form>
      </Card>
    </Col>
  </div>
</template>

<script>
export default {
  name: 'CategoryForm',
  props: ['payload'],
  computed: {
    formCategories () {
      return this.$store.state.formCategories
    }
  },
  methods: {
    categoryAction (action) {
      if (action === 'Edit') {
        this.$store.dispatch('editCategory', {
          id: this.$route.params.id,
          categoryName: this.formCategories.category_name,
          categoryDesc: this.formCategories.category_desc
        })
      } else if (action === 'Add') {
        this.$store.dispatch('createCategory', {
          categoryName: this.formCategories.category_name,
          categoryDesc: this.formCategories.category_desc
        })
      }
    }
  },
  created () {
    if (this.$route.params.id) {
      this.$store.dispatch('getCategoryById', { id: this.$route.params.id })
    } else {
      this.$store.commit('SET_FORM_CATEGORY', { is_add: true })
    }
  }
}
</script>

<style>
  .col-padding {
    padding-top: 15px;
    margin-left: 5em;
  }
</style>
