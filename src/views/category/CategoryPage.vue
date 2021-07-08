<template>
  <div>
    <h1>Categories Page</h1>
    <b-button @click="handleAddData">Add New Data</b-button>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(name)="data">
          <b-form-input v-if="selectedRow[data.index]" type="text" v-model="items[data.index].name"></b-form-input>
          <span v-else>{{data.value}}</span>
      </template>
      <template #cell(action)="data">
        <b-button @click="handleEditRow(data)">
            <span v-if="!selectedRow[data.index]">Edit</span>
            <span v-else>Done</span>
        </b-button>
        <b-button @click="handleDeleteRow(data)">
            <span>Delete</span>
        </b-button>
    </template>

    </b-table>
  </div>
</template>

<script>
import swal from 'sweetalert2'
export default {
  name: 'App',
  components: {},
  data () {
    return {
      fields: [
        {
          key: 'name',
          label: 'Category Name',
          sortable: true
        },
        {
          key: 'updatedAt',
          label: 'Last Edited',
          sortable: true
        },
        {
          key: 'action',
          label: 'Actions'
        }
      ],
      selectedRow: {}
    }
  },
  computed: {
    items () {
      return this.$store.state.categories
    }
  },
  methods: {
    handleAddData () {
      this.$router.push('/categories/add')
    },
    handleEditRow (data) {
      console.log('DATA', data)
      if (this.selectedRow[data.index] === true) {
        console.log(data.item.id, 'UpdateEdit')
        this.$store.dispatch('updateCategory', { id: data.item.id, name: data.item.name, updatedAt: new Date() })
      } else {
        console.log(data.index, 'EditMode')
      }

      this.selectedRow = {
        ...this.selectedRow,
        [data.index]: !this.selectedRow[data.index]
      }

      console.log(this.selectedRow)
    },
    handleDeleteRow (data) {
      swal.fire({
        title: 'Are You Sure To Delete This Data?',
        showDenyButton: true,
        confirmButtonText: 'Yes',
        denyButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$store.dispatch('deleteCategory', { id: data.item.id })
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getCategories')
  }
}
</script>
