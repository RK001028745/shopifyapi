<template>
    <div class="navbar">
        <TransitionRoot as="template" :show="isOpen">
            <Dialog as="div" class="absolute z-50" @close="closeDrawer">
                <TransitionChild as="template" enter="ease-in-out duration-500" enter-from="opacity-0"
                    enter-to="opacity-100" leave="ease-in-out duration-500" leave-from="opacity-100"
                    leave-to="opacity-0">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </TransitionChild>

                <div class="fixed inset-0 overflow-hidden">
                    <div class="absolute inset-0 overflow-hidden">
                        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <TransitionChild as="template"
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enter-from="translate-x-full" enter-to="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leave-from="translate-x-0" leave-to="translate-x-full">
                                <DialogPanel class="pointer-events-auto relative w-screen max-w-md">
                                    <div class="flex h-full flex-col overflow-hidden bg-white shadow-xl">
                                        <!-- Close button positioned half inside, half outside -->
                                        <div class="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4 z-20">
                                            <button type="button"
                                                class="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                                @click="closeDrawer">
                                                <span class="absolute -inset-2.5" />
                                                <span class="sr-only">Close panel</span>
                                                <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>

                                        <!-- Fixed Header -->
                                        <div class="flex-shrink-0 border-b border-gray-200 p-4">
                                            <h2 class="text-lg font-medium text-gray-900 text-center">My Bag</h2>
                                        </div>

                                        <!-- Scrollable Content -->
                                        <div class="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div v-for="item in cartItems" :key="item.id"
                                                class="flex flex-col py-6 border-b border-black-200">
                                                <div class="flex items-center mb-1">
                                                    <img :src="item.image" alt="Product"
                                                        class="h-20 w-20 flex-none rounded-md object-cover object-center">
                                                    <div class="ml-4 flex flex-1 flex-col">
                                                        <div>
                                                            <div
                                                                class="flex justify-between text-base font-medium text-gray-900">
                                                                <h6>{{ item.title }}</h6>
                                                                <p class="ml-4">${{ item.price }}</p>
                                                            </div>
                                                            <div class="flex justify-between items-center">
                                                                <!-- Quantity control box -->
                                                                <div
                                                                    class="flex items-center border border-gray-200 rounded-md">
                                                                    <button @click="decreaseQuantity(item)"
                                                                        class="p-2 text-gray-500 hover:text-gray-700">
                                                                        <MinusIcon class="h-4 w-4" />
                                                                    </button>
                                                                    <span class="px-2 py-1 text-gray-700">{{
                                                                        item.quantity
                                                                        }}</span>
                                                                    <button @click="increaseQuantity(item)"
                                                                        class="p-2 text-gray-500 hover:text-gray-700">
                                                                        <PlusIcon class="h-4 w-4" />
                                                                    </button>
                                                                </div>
                                                                <!-- Remove button box -->
                                                                <div class="border border-gray-200 rounded-md">
                                                                    <button @click="removeFromCart(item.id)"
                                                                        class="p-2 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                                        Remove
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Fixed Footer -->
                                        <div class="border-t border-gray-200 p-4 sm:px-6">
                                            <div class="flex justify-between text-base font-medium text-gray-900 mb-4">
                                                <p>Subtotal</p>
                                                <p>${{ subtotal.toFixed(2) }}</p>
                                            </div>
                                            <div class="flex flex-col space-y-2">
                                                <button @click="viewBag"
                                                    class="w-full rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 shadow-sm hover:bg-gray-50">
                                                    View Bag
                                                </button>
                                                <button @click="checkout"
                                                    class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                                                    Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </div>
            </Dialog>
        </TransitionRoot>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { useCartStore } from '@/store/cartStore'
import { useRouter } from 'vue-router'

const props = defineProps({
    isOpen: Boolean,
})

const emit = defineEmits(['update:isOpen'])

const cartStore = useCartStore()
const router = useRouter()

const cartItems = computed(() => cartStore.items)
const subtotal = computed(() => cartStore.totalPrice)

const closeDrawer = () => {
    emit('update:isOpen', false)
}

const removeFromCart = (id) => {
    cartStore.removeFromCart(id)
}

const increaseQuantity = (item) => {
    cartStore.updateQuantity(item.id, item.quantity + 1)
}

const decreaseQuantity = (item) => {
    if (item.quantity > 1) {
        cartStore.updateQuantity(item.id, item.quantity - 1)
    }
}

const viewBag = () => {
    router.push('/cart')
    closeDrawer()
}

const checkout = () => {
    router.push('/checkout')
    closeDrawer()
}
</script>

<style scoped>
.navbar {
    z-index: -1;
}
</style>