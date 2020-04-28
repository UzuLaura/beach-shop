<template>
  <div class="products">
      <h1>Text</h1>
      <div v-for='product in products'
        :key='product.title'
        >
          {{ product.title }}
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
