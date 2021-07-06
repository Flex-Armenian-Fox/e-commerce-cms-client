<template>
  <div>
    <Modal
      v-model="data.show"
      title="Are You Sure Want To Delete This?"
      @on-cancel="$emit('cancelDelete')"
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
      this.$store.dispatch('deleteProduct', { id })
    }
  }
}
</script>

<style>

</style>
