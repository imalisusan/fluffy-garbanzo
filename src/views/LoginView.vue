<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../store/auth';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();

const handleLogin = async () => {
    console.log('Attempting to log in...');
    
    try {
        await authStore.login({ email: email.value, password: password.value });
        console.log('Login successful! Redirecting...');
    } catch (error) {
        console.error('Login failed:', error);
    }
};
</script>

<template>
<div class="main-container">
    <div class="container">
      <h1>Login</h1>
      <input type="email" placeholder="Email">
      <input type="password" placeholder="Password">
      <button>Login</button>
    </div>
</div>
  </template>

