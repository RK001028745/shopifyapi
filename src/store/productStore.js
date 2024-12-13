import { defineStore } from 'pinia';
import axios from 'axios';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [],
    categories: [],
  }),
  getters: {
    getProductById: (state) => (id) => state.products.find(product => product.id === id),
    getProductsByCategory: (state) => (category) => 
      category === 'All' ? state.products : state.products.filter(product => product.category === category),
  },
  actions: {
    async fetchData() {
      if (this.products.length === 0) {
        try {
          const SHOPIFY_API_URL = import.meta.env.VITE_SHOPIFY_STORE_URL || 'https://code-with-chiranjit.myshopify.com/api/2024-07/graphql.json';
          const SHOPIFY_API_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || "ca6b137e6fa0f0f5b68b3eb3c01d6d4b";
          
          const shopifyClient = axios.create({
            baseURL: SHOPIFY_API_URL,
            headers: {
              'X-Shopify-Storefront-Access-Token': SHOPIFY_API_TOKEN,
              'Content-Type': 'application/json',
            },
          });

          const query = `
            {
              products(first: 50) {
                edges {
                  node {
                    id
                    title
                    description
                    productType
                    tags
                    images(first: 1) {
                      edges {
                        node {
                          url
                          altText
                        }
                      }
                    }
                    variants(first: 10) {
                      edges {
                        node {
                          id
                          title
                          priceV2 {
                            amount
                            currencyCode
                          }
                          compareAtPriceV2 {
                            amount
                            currencyCode
                          }
                          availableForSale
                          selectedOptions {
                            name
                            value
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          `;

          const response = await shopifyClient.post('', { query });
          const productsData = response.data.data.products.edges;

          // Helper function to generate random rating
          function generateRandomFloat(min, max) {
            return parseFloat((Math.random() * (max - min) + min).toFixed(1));
          }

          // Process products with more detailed information
          this.products = productsData.map(edge => {
            const product = edge.node;
            const primaryVariant = product.variants.edges[0]?.node;

            return {
              id: product.id.split('/').pop(), // Shopify global ID
              title: product.title,
              description: product.description,
              image: product.images.edges[0]?.node.url,
              imageAlt: product.images.edges[0]?.node.altText,
              
              // First variant details
              price: primaryVariant?.priceV2.amount,
              compareAtPrice: primaryVariant?.compareAtPriceV2?.amount,
              variantId: primaryVariant?.id, // Critical for checkout
              
              // Additional product details
              category: product.productType || 'Uncategorized',
              tags: product.tags,
              availableForSale: primaryVariant?.availableForSale,
              
              // Optional: variant options if multiple exist
              variants: product.variants.edges.map(variantEdge => ({
                id: variantEdge.node.id,
                title: variantEdge.node.title,
                price: variantEdge.node.priceV2.amount,
                availableForSale: variantEdge.node.availableForSale,
                options: variantEdge.node.selectedOptions
              })),
              
              // Random rating for display purposes
              rating: generateRandomFloat(3, 5)
            };
          });

          // Generate unique categories
          this.categories = ['All', ...new Set(this.products.map(p => p.category))];
          console.log('Products fetched:', this.products);
          
          const variantIds = this.products.flatMap(product => 
            product.variants.map(variant => variant.id)
          );
          console.log('Variant IDs:', variantIds);

        } catch (error) {
          console.error('Error fetching products from Shopify API:', error);
          throw error;
        }
      }
    },
  },
});