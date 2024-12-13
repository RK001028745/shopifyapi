<template>
  <v-container class="fill-height">
    <v-row v-if="cartItems.length === 0" justify="center" align="center" class="fill-height">
      <v-col cols="12" class="text-center">
        <v-icon size="64" color="grey">mdi-cart-outline</v-icon>
        <h2 class="mt-4 text-h5 text-grey-darken-1">Your cart is empty</h2>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col cols="12" md="8">
        <v-card variant="outlined" class="pa-4">
          <v-list>
            <v-list-item v-for="item in cartItems" :key="item.variantId" class="mb-4">
              <template v-slot:prepend>
                <v-img :src="item.image" height="80px" width="80px" cover class="rounded mr-4"></v-img>
              </template>
              <v-list-item-title class="text-h6 mb-1">{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-bold ">${{ item.price }}</v-list-item-subtitle>

              <template v-slot:append>
                <v-row align="center" no-gutters>
                  <v-btn icon @click="decreaseQuantity(item)" class="mr-2" size="small">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="quantity-box">{{ item.quantity }}</span>
                  <v-btn icon @click="increaseQuantity(item)" class="mx-2" size="small">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                  <v-btn icon @click="removeFromCart(item.variantId)" class="ml-2" color="error" size="small">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-row>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card variant="outlined" class="pa-4">
          <v-card-title class="text-h5 mb-4">Order Summary</v-card-title>
          <v-card-text>
            <v-row dense>
              <v-col cols="8">Total Items:</v-col>
              <v-col cols="4" class="text-right">{{ totalItems }}</v-col>
            </v-row>
            <v-row dense>
              <v-col cols="8">Total Price:</v-col>
              <v-col cols="4" class="text-right font-weight-bold">${{ totalPrice.toFixed(2) }}</v-col>
            </v-row>
          </v-card-text>
          <v-card-actions class="mt-4">
            <v-btn color="primary" variant="elevated" block @click="proceedToCheckout">
              Checkout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useCartStore } from '@/store/cartStore';
import { computed } from 'vue';
import Client from 'shopify-buy';
const client2 = Client.buildClient({
  domain: 'code-with-chiranjit.myshopify.com',
  storefrontAccessToken: 'ca6b137e6fa0f0f5b68b3eb3c01d6d4b'
});

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.items);
const totalItems = computed(() => cartStore.totalItems);
const totalPrice = computed(() => cartStore.totalPrice);

const removeFromCart = (variantId) => {
  cartStore.removeFromCart(variantId);
};

const increaseQuantity = (item) => {
  cartStore.updateQuantity(item.variantId, item.quantity + 1);
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    cartStore.updateQuantity(item.variantId, item.quantity - 1);
  }
};

// Log product IDs and variant IDs of products in the cart
const productVariantIds = cartItems.value.map(item => ({
  productId: item.id,
  variantId: item.variantId
}));
console.log('Product and Variant IDs in cart:', productVariantIds);

const proceedToCheckout = () => {
  client2.checkout.create().then((checkout) => {
    // Add the product to the checkout
    const lineItems = cartItems.value.map(item => ({
      variantId: item.variantId,
      quantity: item.quantity
    }));

    client2.checkout.addLineItems(checkout.id, lineItems).then((checkout) => {
      // Redirect to the checkout URL
      window.open(checkout.webUrl, '_blank');
    });
  });
};
</script>

<style scoped>
.quantity-box {
  padding: 4px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  min-width: 40px;
  text-align: center;
  display: inline-block;
  margin: 0 8px;
  font-weight: bold;
}

.v-list-item {
  border-bottom: 1px solid #e0e0e0;
}

.v-list-item:last-child {
  border-bottom: none;
}
</style>
