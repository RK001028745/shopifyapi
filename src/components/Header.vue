<template>
  <div class="head py-2 flex" :elevation="1" app>
    <v-avatar size="90">
      <router-link to="/">
        <v-img src="src\assests\logo.png" height="63px" width="100px" class="ml-3"></v-img>
      </router-link>
    </v-avatar>

    <v-btn variant="text" to="/" text size="large">Home</v-btn>

    <v-btn variant="text" class="custom-btn h-full" to="/shop" text size="large">Shop</v-btn>

    <v-btn variant="text" icon @click="toggleCartDrawer" size="large">
      <v-badge :content="totalItems" color="red" overlap>
        <v-icon icon="mdi-shopping-outline" size="x-large"></v-icon>
      </v-badge>
    </v-btn>

    <v-btn variant="text" size="large" to="/cart">Cart</v-btn>
  </div>

  <CartDrawer :isOpen="isCartDrawerOpen" @update:isOpen="isCartDrawerOpen = $event" />
</template>

<script setup>
import { useCartStore } from '@/store/cartStore';
import { computed, ref } from 'vue';
import CartDrawer from '@/components/CartDrawer.vue';

const cartStore = useCartStore();

const totalItems = computed(() => cartStore.totalItems);

const isCartDrawerOpen = ref(false);

const toggleCartDrawer = () => {
  isCartDrawerOpen.value = !isCartDrawerOpen.value;
};
</script>

<style scoped>
.head {
  background-color: white;

  align-items: center;
  max-height: 80px;
  top: 0;
  box-shadow: 0 1px;

}

.custon-btn {
  min-height: 100%;
}
</style>