<template>
  <div class="products">
    <section class="hero is-bold is-dark is-medium">
        <div class="hero-body">
            <div class="container">
              <h1 class="title">Our Products</h1>
              <h2 class="subtitle">{{ subtitle.toUpperCase() }}</h2>
            </div>
            <div class="buttons container filter-buttons">
              <b-button v-on:click ="filterData('female')" v-bind:class="filterBtn.female">For Her</b-button>
              <b-button v-on:click ="filterData('male')" v-bind:class="filterBtn.male">For Him</b-button>
              <b-button v-on:click ="filterData('all')" v-bind:class="filterBtn.all">All</b-button>
            </div>
        </div>
    </section>
    <section>
        <div class="columns is-multiline">
            <div class="column is-half card is-3" v-for='product in products'
            :key='product.title'
            >
                <div class="flex-card">
                    <img v-on:click="redirect(product.id)" class="product-img" :src="product.img" :alt="product.title">
                </div>
                <div class="card-content">
                    <h2 class="title is-4">{{ product.title }}</h2>
                    <span class="tag" v-bind:class="product.tagColor">{{ product.tag }}</span>
                    <hr>
                    <p>{{ product.about }}</p>
                    <hr>
                    <h3 class="title is-4">Price: {{ product.price }}€</h3>
                    <div class='buttons'>
                        <b-button v-on:click ="addToCart(product.id, product.price, product.title)" class='is-info'>Add to Cart</b-button>
                        <b-button v-on:click="redirect(product.id)">Read More</b-button>
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
      products: [],
      filterBtn: {
        female: '',
        male: '',
        all: 'is-dark'
      },
      subtitle: 'all watches'
    }
  },
  methods: {
    // Method to fetch all data from DB
    get () {
      firebase
        .firestore()
        .collection('watches')
        .get()
        .then(data => {
          data.forEach(product => {
            const newObj = {
              id: product.id,
              title: product.data().title,
              price: product.data().price,
              img: product.data().img,
              about: this.cutText(product.data().about),
              tag: product.data().tag,
              tagColor: this.setTagColor(product.data().tag)
            }
            this.products.push(newObj)
          })
        })
    },
    // Add to local storage Cart
    addToCart (id, price, title) {
      let cart = JSON.parse(localStorage.getItem('cart')) || []
      cart.push({ id: id, price: price, title: title })
      cart = JSON.stringify(cart)
      localStorage.setItem('cart', cart)
      // const cartNum = document.getElementById('basket')
    },
    // Method to route to single product page
    redirect (id) {
      this.$router.push('/products/id/' + id)
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
    },
    // Method to filter fetched data on button click
    filterData (button) {
      if (button !== 'all') {
        // Redirect
        this.$router.push('/products/' + button)
        // Resets data
        this.products = []
        // Changes button color and subttitle
        if (button === 'female') {
          this.filterBtn.all = ''
          this.filterBtn.male = ''
          this.filterBtn.female = 'is-dark'
          this.subtitle = 'for women'
        } else {
          this.filterBtn.all = ''
          this.filterBtn.female = ''
          this.filterBtn.male = 'is-dark'
          this.subtitle = 'for men'
        }
        firebase
          .firestore()
          .collection('watches')
          .where('tag', '==', button)
          .get()
          .then(data => {
            data.forEach(product => {
              const newObj = {
                id: product.id,
                title: product.data().title,
                price: product.data().price,
                img: product.data().img,
                about: this.cutText(product.data().about),
                tag: product.data().tag,
                tagColor: this.setTagColor(product.data().tag)
              }
              this.products.push(newObj)
            })
          })
      } else {
        // Redirect
        this.$router.push('/products/' + button)
        // Changes button color and subtitle
        this.filterBtn.all = 'is-dark'
        this.filterBtn.male = ''
        this.filterBtn.female = ''
        this.subtitle = 'all watches'
        // Resets data
        this.products = []
        this.get()
      }
    }
  },
  // Getting DB data on page load
  beforeMount () {
    if (this.$route.path === '/products/female') {
      this.filterData('female')
    } else if (this.$route.path === '/products/male') {
      this.filterData('male')
    } else {
      this.get()
    }
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
    cursor: pointer;
}
.card:hover {
    opacity: 0.8;
}
.hero {
  margin-bottom: 20px;
}
h2 {
  text-transform: uppercase;
}
.filter-buttons {
  margin-top: 10px !important;
}
.filter-buttons button {
    text-transform: uppercase;
}
</style>
