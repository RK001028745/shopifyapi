import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist')) || [],
  }),
  actions: {
    addToWishlist(product) {
      if (!this.items.find(item => item.id === product.id)) {
        this.items.push(product);
        this.saveToLocalStorage();
      }
    },
    removeFromWishlist(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      this.saveToLocalStorage();
    },
    isInWishlist(productId) {
      return this.items.some(item => item.id === productId);
    },
    saveToLocalStorage() {
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    },
  },
});