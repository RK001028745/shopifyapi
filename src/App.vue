<!-- <template>
  <v-app>
    <Header v-if="!isSignupPage && !isLoginPage" />
    <v-main>
      <router-view />
    </v-main>
    <Footer v-if="!isSignupPage && !isLoginPage"  />
  </v-app>
</template>

<script setup >
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { computed } from 'vue';

import { useRoute } from 'vue-router';
const route = useRoute();

const isSignupPage = computed(() => route.path === '/signup');
const isLoginPage = computed(() => route.path === '/login');
</script>

<style> 
 .v-main{
  background-color: whitesmoke;
 }
</style> -->

<template>
  <v-app>
    <div class="min-h-screen bg-gray-100">
      <Header v-if="!isSignupPage && !isLoginPage" @toggle-cart-drawer="toggleCartDrawer" />
      <main>
        <router-view />
      </main>
    </div>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import CartDrawer from '@/components/CartDrawer.vue';

const route = useRoute();
const isDrawerOpen = ref(false);

const toggleCartDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};
</script>