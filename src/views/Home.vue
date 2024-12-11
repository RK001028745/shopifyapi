<template>

  <v-container>

    <h2 class="mt-6 text-center">Best Rated Products</h2>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="product in featuredProducts" :key="product.id" class="mt-5">
        <ProductCard :product="product" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useProductStore } from '@/store/productStore';
import ProductCard from '@/components/ProductCard.vue';
const productStore = useProductStore();

onMounted(async () => {
  await productStore.fetchData();
});

const featuredProducts = computed(() =>
  productStore.products.filter((product) => product.rating >= 4.5).slice(0, 5)
);

const categories = computed(() => productStore.categories);

</script>

<style scoped>
.description-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v-container {
  max-width: fit-content;
}
</style>