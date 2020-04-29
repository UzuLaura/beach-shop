<template>
  <div class="product">
    <section class="hero is-bold is-dark">
        <div class="hero-body">
            <div class="container">
              <h1 class="title">{{ product.title }}</h1>
            </div>
        </div>
    </section>
    <section class="container">
        <br>
        <router-link to="/products"> &lt;&lt; Back to all watches</router-link>
        <hr>
        <div class="columns">
            <div class="column">
                <div class="flex-card">
                    <img class="product-img" :src="product.img" :alt="product.title">
                </div>
                <div class="card-content">
                    <b-button v-on:click ="addToCart(product.id, product.price, product.title)" class="is-medium is-fullwidth is-dark is-outlined">Add to Cart</b-button>
                    <hr>
                    <h3 class="title is-4">Price: {{ product.price }}€</h3>
                    <p>{{ product.about }}</p>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

export default {
  name: 'Product',
  data () {
    return {
      product: {
        id: '',
        title: 'Undefined'
      },
      filterBtn: {},
      id: this.$route.params.id
    }
  },
  methods: {
    // Method to fetch all data from DB
    get () {
      firebase
        .firestore()
        .collection('watches')
        .doc(this.id)
        .get()
        .then(data => {
          this.product.id = data.id
          this.product.title = data.data().title
          this.product.price = data.data().price
          this.product.img = data.data().img
          this.product.about = data.data().about
          this.product.tag = data.data().tag
          this.product.tagColor = this.setTagColor(data.data().tag)
        })
    },
    // Add to local storage Cart
    addToCart (id, price, title) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push({ id: id, price: price, title: title })
      cart = JSON.stringify(cart)
      localStorage.setItem('cart', cart)
    },
    setTagColor (tag) {
      if (tag === 'female') {
        return 'is-danger'
      } else {
        return 'is-success'
      }
    }
  },
  // Getting DB data on page load
  beforeMount () {
    this.get()
  }
}

</script>

<style>
.flex-card {
    display: flex;
    justify-content: center;
}
h1 {
    text-transform: uppercase;
}
.product-img {
  height: 500px;
}
</style>
