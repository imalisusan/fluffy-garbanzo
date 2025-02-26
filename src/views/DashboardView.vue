<template>
    <div class="dashboard-wrapper">
      <div class="dashboard-container">
        <h2>Wardrobe Dashboard</h2>
        <AddItemForm class="form-spacing" />
        <ItemList />
      </div>
    </div>
  </template>
  
  <script setup>
  import AddItemForm from '../components/AddItemForm.vue';
  import ItemList from '../components/ItemList.vue';
  </script>
  
