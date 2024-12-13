<template>
  <v-app>
    <div class="min-h-screen bg-gray-100">
      <Header />
      <main>
        <router-view />
      </main>
    </div>
  </v-app>
</template>

<script setup>

import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';

const route = useRoute();

</script>