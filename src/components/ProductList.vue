<template>
  <div class="container">
    <h2>Product List</h2>
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
    };
  },
  async mounted() {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/products');
      this.products = response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }
};
</script>

<style scoped>


</style>
