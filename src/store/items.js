import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from './auth';

export const useItemStore = defineStore('items', {
  state: () => ({
    items: [],
  }),
  actions: {
    async fetchItems() {
      try {
        const authStore = useAuthStore();
        const token = authStore.token;

        if (!token) {
          console.error('No token found, user is not authenticated.');
          return;
        }

        const response = await axios.get('/items', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        this.items = response.data;
      } catch (error) {
        console.error('Failed to fetch items:', error.response?.data || error.message);
      }
    },

    async addItem(itemData) {
      const authStore = useAuthStore();
      const token = authStore.token;

      await axios.post('/items', itemData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await this.fetchItems();
    },

    async updateItem(id, updatedData) {
      const authStore = useAuthStore();
      const token = authStore.token;

      await axios.put(`/items/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await this.fetchItems();
    },

    async deleteItem(id) {
      const authStore = useAuthStore();
      const token = authStore.token;

      await axios.delete(`/items/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      await this.fetchItems();
    },
  },
});
