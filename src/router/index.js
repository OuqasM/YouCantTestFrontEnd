import Vue from 'vue'
import VueRouter from 'vue-router'

import ProductList from '../components/ProductList.vue';
import NewProduct from '../components/NewProduct.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: ProductList
  },
  {
    path: '/add-product',
    name: 'NewProduct',
    component: NewProduct
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
