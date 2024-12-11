<template>
  <v-container v-if="product">
    <v-row>
      <v-col cols="12" md="6">
        <v-img :src="product.image" height="300"></v-img>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-text>${{ product.price }}</v-card-text>
          <v-card-subtitle>rating:{{ product.rating }}</v-card-subtitle>
          <v-card-text>{{ product.description }}</v-card-text>
          <v-card-actions>
            <v-btn @click="addToCart(product)" color="teal" variant="flat">Add to Cart</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else-if="loading">
    <v-row>
      <v-col class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col class="text-center">
        <v-alert type="error">Product not found</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();

const product = ref(null);
const loading = ref(true);

onMounted(async () => {
  const productId = route.params.id;
  try {
    product.value = await productStore.getProductById(productId);
  } catch (error) {
    console.error('Failed to fetch product:', error);
  } finally {
    loading.value = false;
  }
});

const addToCart = (product) => {
  cartStore.addToCart(product);
};
</script>

<style>
.v-container {
  max-width: fit-content;
}
</style>