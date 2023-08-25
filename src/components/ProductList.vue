<template>
  <div class="container">
    <h2>Product List</h2>
    <div>
      <label for="categorySelect">Filter by Category:</label>
      <select id="categorySelect" v-model="selectedCategoryId" @change="getFilteredProducts">
        <option value="">All Categories</option>
        <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
      </select>
    </div>
    <div class="row">
      <div class="card col-md-4 p-1 m-3" v-for="product in products.products" :key="product.id">
        <div class="product-item">
          <div class="product-image">
            <img v-if="product.image" :src="host+product.image" height="50" width="150" alt="Product Image">
            <div v-else class="placeholder-image">No Image</div>
          </div>
          <div class="product-details">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p>Price: {{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      host : "http://127.0.0.1:8000/",
      categories: [], 
      selectedCategoryId: '' 
    };
  },
  methods: {
    async getFilteredProducts() {

      console.log("salam");
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/products', {
          params: {
            category_id: this.selectedCategoryId
          }
        });
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    },
  async mounted() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/products');
      this.products = response.data;

      // Fetch categories and populate the categories array
      const categoriesResponse = await axios.get('http://127.0.0.1:8000/api/v1/categories');
      this.categories = categoriesResponse.data.categories;

    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
};
</script>

<style scoped>


</style>
