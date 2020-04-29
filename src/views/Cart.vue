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
        <b-table :data="cart" :columns="columns"></b-table>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      cart: [],
      columns: [
        {
          field: 'order_nr',
          label: '',
          width: '40',
          numeric: true
        },
        {
          field: 'item_image',
          label: 'Item Image'
        },
        {
          field: 'title',
          label: 'Item Name'
        },
        {
          field: 'price',
          label: 'Price'
        },
        {
          field: 'remove',
          label: 'Remove'
        }
      ]
    }
  },
  methods: {
    getFromCart () {
      const cart = JSON.parse(localStorage.getItem('cart'))
      cart.forEach(item => this.cart.push(item))
    }
  },
  beforeMount () {
    this.getFromCart()
  }
}
</script>

<style>

</style>
