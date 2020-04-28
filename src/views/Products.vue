<template>
  <div class="products">
    <section class="hero is-bold is-dark is-medium">
        <div class="hero-body">
            <div class="container">
            <h1 class="title">Our Products</h1>
            <h2 class="subtitle">Subtitle</h2>
            </div>
        </div>
    </section>
    <section>
        <div class="columns is-multiline">
            <div class="column card is-3" v-for='product in products'
            :key='product.title'
            >
                <div class="card-image">
                    <img class="card-img" :src="product.img" :alt="product.title">
                </div>
                <div class="card-content">
                    <h2>{{ product.title }}</h2>
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
  name: 'Products',
  data () {
    return {
      products: []
    }
  },
  methods: {
    get () {
      firebase
        .firestore()
        .collection('watches')
        .get()
        .then(data => {
          data.forEach(d => {
            const newObj = {
              title: d.data().title,
              img: d.data().img,
              about: d.data().about.substring(1, 200)
            }
            this.products.push(newObj)
          })
        })
    }
  },
  beforeMount () {
    this.get()
  }
}
</script>

<style>
.product-img {
    height: 300px;
    text-align: center;
}
</style>
