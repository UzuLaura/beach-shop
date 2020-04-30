<template>
  <section>
    <b-carousel class="carousel" :indicator="false" :pause-info="false">
        <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
          <img :src="carousel.src"/>
        </b-carousel-item>
    </b-carousel>
    <div class="container">
      <div class="columns text">
          <div class="column watch" @click="redirectMale">
            <h1 class="title is-3">FOR<br>
            MEN</h1>
            <b-button class="borderless" type="button" native-type="submit">Look</b-button>
        </div>
        <div class="vertical-line"></div>
         <div class="column watch" @click="redirectFemale">
            <h1 class="title is-3">FOR<br>
            WOMEN</h1>
            <b-button class="borderless" type="button" native-type="submit">Look</b-button>
        </div>
        <div class="vertical-line"></div>
        <div class="column watch" @click="redirect">
            <h1 class="title is-3">FOR<br>
            BOTH</h1>
            <b-button class="borderless" type="button" native-type="submit">Look</b-button>
        </div>
      </div>
    </div>
    <div class="content content1">
      <div class="container wrapper">
      </div>
      <div class="container collection">
          <h2 class="">Collections</h2>
          <b-button type="button is-dark" @click="redirect" native-type="submit">Find</b-button>
      </div>
      <div class="container content1">
            <div class="columns">
              <div class="column photo">
            </div>
            <div class="column text1">
              <div>
                <h1 class="title is-2">UNIQUE<br>
                <span class="indentation">WATCHES</span></h1>
                <b-button class='button' type="is-dark" outlined @click="redirect" native-type="submit" expanded>Look</b-button>
              </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Home',
  data () {
    return {
      carousels: [
        { src: 'https://www.heritagewatches.co.uk/image/cache/catalog/slideshow/heritage_sliders_general_notext-1920x600.jpg' },
        { src: 'https://chrwatches.com/wp-content/uploads/2016/11/Pulsar-Ladies-Banner.jpg' },
        { src: 'https://www.qualitykingwatch.com/image/cache/catalog/slider/allcollection-1920x600.jpg' }
      ]
    }
  },
  methods: {
    redirect () {
      this.$router.push('/products')
    },
    redirectFemale () {
      this.$router.push('/products/female')
    },
    redirectMale () {
      this.$router.push('/products/male')
    }
  }
}
</script>
<style scoped>
.columns, .column {
  padding: 0;
  margin: 0;
}
.text {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.indentation {
  margin-left: 30px;
}
.watch {
  text-align: center;
  margin-top: 20px;
  cursor: pointer;
}
.watch:hover {
  opacity: 0.8;
}
.content h2 {
  margin: 0;
}
.button::after {
    content: "\276F";
    font-size: .8em;
    display: inline-block;
    padding-left: 15px;
}
.borderless {
  border: none;
}
.vertical-line {
    display: block;
    background-color: #e6e6e6;
    width: 1px;
    height: 90px;
}
.content{
  background-color: #eee;
}
.collection {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background: #fff;
  padding: 30px;
}
.wrapper {
  margin: 0 auto;
  background-image: url('https://www.vacheron-constantin.com/content/dam-import/vac/a9c9/11f0/2038102.png.scale.1180.380.jpeg');
  background-size: cover;
  background-position: center;
  height: 350px;
}
.content1 {
  margin-top: 15px;
}
.photo {
  background-image: url('https://images.unsplash.com/photo-1482775907821-a56ec43344fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80');
  background-size: cover;
  background-position: center;
  height: 550px;
}
.text1 {
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 550px;
}
@media only screen and (max-width:763px){
  .vertical-line{
    height: 2px;
    width: 100%;
    margin: 0 30px;
  }
  .photo {
    max-height: 400px;
  }
  .text1 {
    padding-bottom: 50px;
  }
}
</style>
