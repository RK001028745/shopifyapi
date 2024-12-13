import { defineStore } from 'pinia';

export const useCartStore = defineStore('cartStore', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cart')) || [],
  }),
  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + (item.quantity || 0), 0),
    totalPrice: (state) => state.items.reduce((total, item) => total + (item.price * (item.quantity || 0)), 0),
  },
  actions: {
    addToCart(product) {
      const item = this.items.find((item) => item.variantId === product.variantId);
      if (item) {
        item.quantity += 1;
      } else {
        this.items.push({ ...product, quantity: 1 });
      }
      this.saveCart();
      console.log('Cart items after adding:', this.items);
    },
    removeFromCart(variantId) {
      this.items = this.items.filter((item) => item.variantId !== variantId);
      this.saveCart();
      console.log('Cart items after removing:', this.items);
    },
    updateQuantity(variantId, quantity) {
      const item = this.items.find((item) => item.variantId === variantId);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          this.removeFromCart(variantId);
        }
      }
      this.saveCart();
      console.log('Cart items after updating quantity:', this.items);
    },
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },
  },
});