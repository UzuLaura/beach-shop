<template>
  <div class="container">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="../img/logo-watchshop.png"
            alt="Logo"
          >
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item href="#">
          <router-link class="a-name" to="/">Home</router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
          <router-link class="a-name" to="/products">Watches</router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
          <router-link class="a-name" to="/cart"><img @addToCart="getCart" class="basket" src="../img/basket2.png" alt="basket"><span>{{ cartLength }}</span></router-link>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      cartLength: 0
    }
  },
  methods: {
    getCart () {
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart.forEach(item => {
        this.cartLength += item.quantity
      })
    }
  },
  beforeMount () {
    this.getCart()
  }
}
</script>

<style scoped>
  .basket {
    height: 25px;
    color: #0f7670;
    vertical-align: middle;
    transform: translate(0, -10%)
  }
  .navbar-item img {
    max-height: 50px;
    margin: 5px;
  }
  .a-name {
    color: #0f7670;
    font-size: 20px;
    text-transform: uppercase;
  }

</style>
