<template>
<div class="main-container">
    <div class="container">
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <input v-model="name" type="text" placeholder="Name" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '../store/auth';
  
  const authStore = useAuthStore();
  const name = ref('');
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const handleRegister = async () => {
    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
      return;
    }
  
    await authStore.register({ 
      name: name.value, 
      email: email.value, 
      password: password.value, 
      password_confirmation: confirmPassword.value 
    });
  };
  </script>


  