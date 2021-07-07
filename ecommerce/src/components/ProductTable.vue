<template>
  <div>

    <section class="grid grid-cols-4 gap-y-1 gap-x-2">
        <section v-for="(product) in productsList" :key="product.id">

            <!-- START - PRODUCT CARD -->
            <div class="container mx-2 my-4 rounded-lg">
            <div class="w-64 border bg-gray-50 rounded-lg">
                <img :src="product.image_url" class="w-full rounded-lg object-cover h-40 max-h-40">
                <div class="p-4">
                <h5 class="text-md text-indigo-600 font-bold tracking-widest mb-1 uppercase">{{ product.name }}</h5>
                <h5 class="text-sm text-gray-500 font-bold mb-2">Rp{{ priceFormatter(product.price) }}</h5>
                <h4 class="text-sm text-gray-500 font-light">Stock: {{ product.stock }}</h4>

                <!-- --Edit + Delete Buttons -->
                <div class="flex flex-row-reverse pl-0 pt-4">
                    <button @click.prevent="deleteProduct(product.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500 hover:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                    <button class="mr-1" @click.prevent="editProduct(product.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-yellow-500 hover:text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </button>
                </div>

                </div>
            </div>
            </div>
            <!-- END - PRODUCT CARD -->

        </section>
    </section>
  </div>

    

</template>

<script>
export default {
    name: 'ProductTable',
    props: ['productsList'],
    methods: {
        editProduct (productId) {
            this.$store.dispatch('fetchOneProduct', productId)
        },
        deleteProduct (productId) {
            this.$store.dispatch('deleteProduct', productId)
        },
        priceFormatter (price) {
            let string = price.toString()
            let array = []
            let counter = 0

            for (let i = string.length-1; i >= 0; i--) {
                if (counter === 3) {
                    array.push(',')
                    counter = 0
                }
                array.push(string[i])
                counter++
            }

            let result = ''
            for (let i = array.length-1; i >= 0; i--) {
                result += array[i]
            }
            return result
        }
    }
}
</script>

<style>

</style>