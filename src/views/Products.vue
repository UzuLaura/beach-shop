<template>
  <div class="products">
      <div>
        <h1>Our Products</h1>
        <div class="column" v-for='product in products'
            :key='product.title'
            >
            <img class="" :src="product.img" :alt="product.title">
            <h2>{{ product.title }}</h2>
        </div>
      </div>
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
              img: d.data().img
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
</style>
