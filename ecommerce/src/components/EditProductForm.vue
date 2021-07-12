<template>
  
    <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <!--
            Background overlay, show/hide based on modal state.
            -->
            <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <!-- This element is to trick the browser into centering the modal contents. -->
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <!--
            Modal panel, show/hide based on modal state.
            -->
            <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                    <!-- Heroicon name: outline/exclamation -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                </div>

                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Edit Product Form
                    </h3>
                    <div class="mt-2">

                    <p class="text-sm text-gray-500">
                    In order to edit your existing product, please make sure to complete all fields.
                    </p>
                    <br>
                    
                    <form action="#">                     
                        <div class="bg-white">
                            <div class="grid grid-cols-6 gap-6">

                            <div class="col-span-8 sm:col-span-6">
                                <label for="name" class="block text-md font-small text-indigo-600">Product Name</label>
                                <input v-model="name" type="text" name="name" id="name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md">
                            </div>

                            <div class="col-span-6 sm:col-span-6">
                                <label for="image_url" class="block text-md font-small text-indigo-600">Image URL</label>
                                <input v-model="image_url" type="text" name="image_url" id="image_url" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md">
                            </div>

                            <div class="col-span-3 sm:col-span-3">
                                <label for="price" class="block text-md font-small text-indigo-600">Price</label>
                                <input v-model="price" type="number" name="price" id="price" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md">
                            </div>

                            <div class="col-span-3 sm:col-span-3">
                                <label for="stock" class="block text-md font-small text-indigo-600">Stock</label>
                                <input v-model="stock" type="number" name="stock" id="stock" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border border-gray-200 rounded-md">
                            </div>

                            </div>
                        </div>
                    </form>
                    
                    <!-- END - FORM -->

                    </div>
                </div>
                </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button @click.prevent="submitEdit" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                Submit Edit
                </button>
                <button @click.prevent="backToProducts" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                Cancel
                </button>
            </div>
            </div>
        </div>
        </div>

</template>

<script>
export default {
    name: 'EditProductForm',
    data () {
      return {
        name: '',
        image_url: '',
        price: 0,
        stock: 0,
        productId: 0
      }
    },
    methods: {
        submitEdit () {
            const payload = {
                productId: this.productId,
                name: this.name,
                image_url: this.image_url,
                price: this.price,
                stock: this.stock
            }
            this.$store.dispatch('editProduct', payload)
        },
        backToProducts () {
            this.$store.dispatch('hideEditForm')
        }
    },
    created () {
      this.name = this.$store.state.currentProduct.product.name
      this.image_url = this.$store.state.currentProduct.product.image_url
      this.price = this.$store.state.currentProduct.product.price
      this.stock = this.$store.state.currentProduct.product.stock
      this.productId = this.$store.state.currentProduct.product.id
    }
}
</script>

<style>

</style>