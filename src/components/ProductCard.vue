<template>

  <v-card class="d-flex flex-column px-4 py-4" height="100%" hover>
    <v-img :src="product.image" height="160" contain>
    </v-img>
    <v-card-title>{{ product.title }}</v-card-title>
    <v-card-text class="font-weight-bold">${{ product.price }}</v-card-text>
    <v-card-subtitle class="font-weight-bold">rating: {{ product.rating }}
    </v-card-subtitle>

    <v-card-text class="description-text">
      {{ product.description }}
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions>
      <v-btn :to="`/product/${product.id}`" variant="elevated">View Details</v-btn>
      <v-btn @click="addToCart" color="teal" variant="elevated"><i class="fa-solid fa-cart-shopping"></i>Add to
        Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useCartStore } from '@/store/cartStore';
import { computed, defineProps } from 'vue';


const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

function generateRandomFloat(min, max) {
  return (Math.random() * (max - min) + min).toFixed(1);
}

const randomNumber = generateRandomFloat(1, 5);


const cartStore = useCartStore();

const addToCart = () => {
  cartStore.addToCart(props.product);
};

</script>

<style scoped>
.description-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

body {
  background: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

* {
  position: relative;
  box-sizing: border-box;
}
</style>