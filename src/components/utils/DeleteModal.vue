<template>
  <div>
    <Modal
      v-model="data.show"
      title="Are You Sure Want To Delete This?"
      @on-cancel="$emit('deleteSuccess')"
      @on-ok="deleteData(data.itemId)"
      cancel-text="Cancel"
      ok-text="Yes Delete"
    >
      <p>{{data.itemName}}</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'DeleteModal',
  props: ['data'],
  methods: {
    deleteData (id) {
      this.$axios({
        method: 'DELETE',
        url: '/products/' + id,
        headers: {
          access_token: localStorage.getItem('access_token')
        }
      }).then(() => {
        this.$Message.success('Delete Success')
        this.$emit('deleteSuccess')
      }).catch((err) => {
        console.log('error create', err)
      })
    }
  }
}
</script>

<style>

</style>
