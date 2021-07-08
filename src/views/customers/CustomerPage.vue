<template>
  <div>
    <h1>Customers</h1>
    <b-button @click="handleAddData">Add New Data</b-button>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(action)>
        <b-button>
            <span>Edit</span>
        </b-button>
        <b-button>
            <span>Delete</span>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data () {
    return {
      fields: [
        {
          key: 'name',
          label: 'Customer Name',
          sortable: true
        },
        {
          key: 'phone',
          label: 'Phone No',
          sortable: true
        },
        {
          key: 'address',
          label: 'Address',
          sortable: true
        },
        {
          key: 'action',
          label: 'Actions'
        }
      ],
      items: [
        {
          name: 'Budi Gunawan',
          phone: '628128128121',
          address: 'Jl. Mana Saja Senang'
        }
      ],
      selectedRow: {}
    }
  }
}
</script>
