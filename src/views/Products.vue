<template>
  <div class="products">
    <section class="hero is-bold is-dark is-medium">
        <div class="hero-body">
            <div class="container">
            <h1 class="title">Our Products</h1>
            <h2 class="subtitle">All Watches</h2>
            </div>
        </div>
    </section>
    <section>
        <div class="columns is-multiline">
            <div class="column is-half card is-3" v-for='product in products'
            :key='product.title'
            >
                <div class="flex-card">
                    <img class="product-img" :src="product.img" :alt="product.title">
                </div>
                <div class="card-content">
                    <h2 class="title is-4">{{ product.title }}</h2>
                    <span class="tag" v-bind:class="product.tagColor">{{ product.tag }}</span>
                    <hr>
                    <p>{{ product.about }}</p>
                    <hr>
                    <h3 class="title is-4">Price: {{ product.price }}€</h3>
                    <div class='buttons'>
                        <b-button>Add to Cart</b-button>
                        <b-button>Read More</b-button>
                    </div>
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
          data.forEach(product => {
            const newObj = {
              title: product.data().title,
              price: product.data().price,
              img: product.data().img,
              about: this.cutText(product.data().about),
              tag: product.data().tag,
              tagColor: this.setTagColor(product.data().tag)
            }
            this.products.push(newObj)
            console.log(newObj)
          })
        })
    },
    cutText (string) {
      if (string.length > 200) {
        string = string.substring(0, 200) + '...'
        return string
      } else {
        return string
      }
    },
    setTagColor (tag) {
      if (tag === 'female') {
        return 'is-danger'
      } else {
        return 'is-success'
      }
    }
  },
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
.product-img {
    height: 300px;
}
.card:hover {
    opacity: 0.9;
}
h2 {
  text-transform: uppercase;
}
</style>
