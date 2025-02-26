<template>
    <div class="items-container">
      <h3>My Clothing Items</h3>
  
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search items..."
        class="filter-input"
      />
  
      <select v-model="selectedCategory" class="category-filter">
        <option value="">All Categories</option>
        <option v-for="category in uniqueCategories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
  
      <div class="table-wrapper">
        <table class="item-table">
          <thead>
            <tr>
              <th>
                Name
                <button @click="sortBy('name')">▲▼</button>
              </th>
              <th>
                Category
                <button @click="sortBy('category')">▲▼</button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedAndFilteredItems" :key="item.id">
              <td class="item-name">{{ item.name }}</td>
              <td class="item-category">{{ item.category }}</td>
              <td class="item-actions">
                <button class="edit-btn" @click="editItem(item)">Edit</button>
                <button class="delete-btn" @click="deleteItem(item.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useItemStore } from '../store/items';
  
  const itemStore = useItemStore();
  itemStore.fetchItems();
  
  const searchQuery = ref('');
  const selectedCategory = ref('');
  const sortKey = ref('');
  const sortOrder = ref(1);
  
  const uniqueCategories = computed(() => {
    return [...new Set(itemStore.items.map(item => item.category))];
  });
  
  const sortedAndFilteredItems = computed(() => {
    let items = itemStore.items.filter((item) =>
      (item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.value.toLowerCase())) &&
      (selectedCategory.value === '' || item.category === selectedCategory.value)
    );
  
    if (sortKey.value) {
      items = [...items].sort((a, b) => {
        return sortOrder.value * a[sortKey.value].localeCompare(b[sortKey.value]);
      });
    }
    return items;
  });
  
  const sortBy = (key) => {
    if (sortKey.value === key) {
      sortOrder.value *= -1;
    } else {
      sortKey.value = key;
      sortOrder.value = 1;
    }
  };
  
  const deleteItem = async (id) => {
    await itemStore.deleteItem(id);
  };
  
  const editItem = (item) => {
    const newName = prompt('Enter new name:', item.name);
    if (newName) {
      itemStore.updateItem(item.id, { name: newName });
    }
  };
  </script>