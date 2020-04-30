import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Products from '../views/Products.vue'
import Product from '../views/Product.vue'
import Cart from '../views/Cart.vue'
import Orders from '../views/Orders.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/products/:type',
    name: 'ProductsType',
    component: Products
  },
  {
    path: '/products/id/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
    // Padaryti, kad neleistu eiti i orders, jei krepselis tuscias
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
