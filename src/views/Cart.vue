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
        <table class="table table is-fullwidth">
            <thead>
                <th style="text-align:right">Quantity</th>
                <th style="text-align:center">Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Remove</th>
            </thead>
            <tbody>
                <tr v-for='item in cart'
                :key='item.title'>
                    <td style="text-align:right">1</td>
                    <td style="text-align:center"><img class="product-img" :src="item.img" :alt="item.title"></td>
                    <td>{{ item.title }}</td>
                    <td>{{ item.price }} EUR</td>
                    <td><b-button v-on:click="removeFromCart(item.id)">Remove</b-button></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4" class="right subtitle">Total Price:</td>
                    <td class="subtitle"> {{total}}  EUR</td>
                    <td><b-button @click="redirect" type="button  is-primary" native-type="submit">Proceed to payment</b-button></td>
                </tr>
            </tfoot>
        </table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      cart: [],
      quantity: 0
    }
  },
  computed: {
    total () {
      return this.cart.reduce((acc, cur) => acc + Math.floor(cur.price), 0)
    }
  },
  methods: {
    getFromCart () {
      const cart = JSON.parse(localStorage.getItem('cart'))

      cart.forEach(item => this.cart.push(item))
    },
    redirect () {
      this.$router.push('/orders')
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
