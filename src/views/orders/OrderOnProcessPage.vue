<template>
  <div>
    <h1>Order On Process</h1>
    <b-table striped hover :items="items" :fields="fields">
      <template #cell(action)>
        <b-button>
            <span>Done Process</span>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  data() {
    return {
      fields: [
        {
          key: 'order_id',
          label: 'Order Id',
          sortable: true
        },
        {
          key: 'order_date',
          label: 'Order Date',
          sortable: true
        },
        {
          key: 'customer',
          label: 'Customer',
          sortable: true
        },
        {
          key: 'item',
          label: 'Item(s)',
          sortable: true
        },
        {
          key: 'action',
          label: 'Actions'
        }
      ],
      items: [
          {
              order_id: "O1/2107080001",
              order_date: "08-07/2021",
              customer: "Budi Gunawan",
              item: 1
          }
      ],
      selectedRow: {}
    };
  },
};
</script>