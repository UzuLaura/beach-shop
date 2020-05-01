<template>
  <div class="cart">
    <section class="hero is-bold is-dark">
        <div class="hero-body">
            <div class="container">
              <h1 class="title">Your Cart</h1>
            </div>
        </div>
    </section>
    <section class="container">
         <b-notification :active.sync="isActive" class="is-danger" aria-close-label="Close notification">
          You dont have any orders
          </b-notification>
        <table class="table table is-fullwidth">
            <thead>
              <tr>
                <th style="text-align:right">Quantity</th>
                <th style="text-align:center">Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
                <tr v-for='item in cart'
                :key='item.title'>
                    <td style="text-align:right">{{ item.quantity }}</td>
                    <td style="text-align:center"><img class="product-img" :src="item.img" :alt="item.title"></td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.price }} EUR</td>
                    <td><b-button type="is-danger" outlined v-on:click="removeFromCart(item.id)">Remove</b-button></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td class="subtitle right">Total: </td>
                    <td class="subtitle">{{ quantity }}</td>
                    <td class="right subtitle">Total Price:</td>
                    <td class="subtitle"> {{ totalPrice }}  EUR</td>
                    <td><b-button @click="redirect"  type="is-dark" outlined native-type="submit">Continue</b-button></td>
                </tr>
            </tfoot>
        </table>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
export default {
  name: 'Cart',
  data () {
    return {
      cart: [],
      quantity: 0,
      totalPrice: 0,
      isActive: false
    }
  },
  methods: {
    getFromCart () {
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart.forEach(item => this.cart.push(item))
    },
    getTotalQuantity () {
      this.cart.forEach(item => {
        this.quantity += item.quantity
      })
      console.log(this.quantity)
    },
    getTotalPrice () {
      this.totalPrice = this.cart.reduce((acc, cur) => acc + Number(cur.price), 0).toFixed(2)
    },
    redirect () {
      if (this.totalPrice > 0) {
        this.cart.forEach((item) => {
          firebase.firestore().collection('orders').add({
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity
          }).then(() => {
            this.$router.push('/orders')
          })
        })
      } else {
        this.isActive = true
      }
    },
    removeFromCart (id) {
      let cart = JSON.parse(localStorage.getItem('cart'))
      cart = cart.filter(item => item.id !== id)
      cart = JSON.stringify(cart)
      localStorage.setItem('cart', cart)
      window.location.reload()
    }
  },
  beforeMount () {
    this.getFromCart()
    this.getTotalQuantity()
    this.getTotalPrice()
  }
}
</script>

<style scoped>
    .product-img {
        height: 100px;
        display: inline-block;
    }
    table {
        margin-top: 10px;
    }
    td {
        vertical-align: middle !important;
    }
    .right {
        text-align: right;
    }
</style>
