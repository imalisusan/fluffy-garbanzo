<template>
  <div class="form-container">
 
    <form @submit.prevent="handleSubmit" class="item-form">
      <p>Fill the form to add a new clothing item</p>
      <input type="text" v-model="name" placeholder="Item Name" required />
      <select v-model="category">
        <option disabled>Select Category</option>
        <option>Tops</option>
        <option>Bottoms</option>
        <option>Shoes</option>
      </select>
      <button type="submit">Add Item</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useItemStore } from '../store/items';

const itemStore = useItemStore();
const name = ref('');
const category = ref('');

const handleSubmit = async () => {
  await itemStore.addItem({ name: name.value, category: category.value });
  name.value = '';
  category.value = '';
};
</script>
