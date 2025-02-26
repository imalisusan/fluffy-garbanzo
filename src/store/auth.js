import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async register(data) {
        try {
          const response = await axios.post('http://127.0.0.1:8000/api/auth/register', data);
  
          this.token = response.data.token;
          localStorage.setItem('token', this.token);
  
          axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
  
          await this.getUser();
  
          window.location.href = '/dashboard';
  
        } catch (error) {
          console.error('Registration failed:', error.response?.data || error.message);
        }
      },

    async login(credentials) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/login', credentials);

        this.token = response.data.token;
        localStorage.setItem('token', this.token);

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;

        await this.getUser();

        window.location.href = '/dashboard';
      } catch (error) {
        console.error('Login failed:', error.response?.data || error.message);
      }
    },

    async getUser() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user');
        this.user = response.data;
      } catch (error) {
        console.error('Failed to fetch user:', error.response?.data || error.message);
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');

      delete axios.defaults.headers.common['Authorization'];
    }
  }
});
