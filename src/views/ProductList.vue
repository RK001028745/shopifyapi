<template>
  <v-container>

    <h1 class="shop-title">All Products</h1>

    <v-row v-if="loading">
      <v-col class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <template v-else>
      <v-row>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4">
          <ProductCard :product="product" @add-to-cart="addToCart" />
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import ProductCard from '@/components/ProductCard.vue';

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const products = computed(() => productStore.products);
const loading = ref(true);

onMounted(async () => {
  await productStore.fetchData();
  loading.value = false;
});

const addToCart = (product) => {
  cartStore.addToCart(product);
};

</script>

<style scoped>
.category-title,
.shop-title {
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin: 2rem 0;
  text-transform: capitalize;
}

.v-container {
  max-width: 1200px;
}
</style>
