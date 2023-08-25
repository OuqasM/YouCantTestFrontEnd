<template>
  <div class="container" >
    <h2>Add New Product</h2>
    <div v-if="successMessage" class="alert alert-success" role="alert">
        {{ successMessage }}
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
    </div>

    <form @submit.prevent="addProduct">
      <div class="mb-3">
        <label for="name" class="form-label">Name:</label>
        <input type="text" id="name" v-model="newProduct.name" class="form-control" required>
      </div>
      
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea id="description" v-model="newProduct.description" class="form-control" required></textarea>
      </div>
      
      <div class="mb-3">
        <label for="price" class="form-label">Price:</label>
        <input type="number" id="price" v-model="newProduct.price" class="form-control" required>
      </div>
      
      <div class="mb-3">
        <label for="image" class="form-label">Image:</label>
        <input type="file" id="image" @change="handleImageChange" class="form-control" required>
      </div>

      <label for="category">Category:</label>
        <select id="category" v-model="newProduct.ids" multiple  class="select" >
          <option v-for="category in categories.categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>

      <button type="submit" class="btn btn-primary"  >Add Product</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newProduct: {
        name: '',
        description: '',
        price: null,
        image: null,
        ids: [] // Ids of categories attached to this product
      },
      successMessage: null,
      errorMessage: null,
      categories: [] // fetched existed categories from the backend
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/categories');
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    },
   
    async addProduct() {

      console.log(this.newProduct.image);
      const formData = new FormData();
      formData.append('name', this.newProduct.name);
      formData.append('description', this.newProduct.description);
      formData.append('price', this.newProduct.price);
      formData.append('image', this.newProduct.image);
      this.newProduct.ids.forEach(categoryId => {
        formData.append('category_ids[]', categoryId);
      });     

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });        
        
        this.successMessage = 'Product added successfully!';
        this.clearForm();
      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = 'Error adding product: ' + error.response.data.message;
        } else {
          this.errorMessage = 'An error occurred while adding the product.';
        }        
      }
    },

    // return only the first file uploaded after any file is selected
    handleImageChange(event) {
      this.newProduct.image = event.target.files[0];
    },
    // reset the form
    clearForm() {
      this.newProduct = {
        name: '',
        description: '',
        price: null,
        image: null,
        ids : []
      };
      this.fetchCategories;
    }
  },

  // fetch all the categories to the select option at first
  mounted() {
    this.fetchCategories(); 
  }
};
</script>

<style scoped>
</style>
