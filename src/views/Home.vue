<template>
  <section>
    <b-carousel class="carousel">
        <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
          <img :src="carousel.src"/>
        </b-carousel-item>
    </b-carousel>
    <div class="container">
      <div class="columns text">
          <div class="column watch">
            <h1 class="title is-3">FOR<br>
            MEN</h1>
            <b-button type="button" @click="redirectMale" native-type="submit">Look</b-button>
        </div>
        <div class="line"></div>
         <div class="column watch">
            <h1 class="title is-3">FOR<br>
            WOMEN</h1>
            <b-button type="button" @click="redirectFemale" native-type="submit">Look</b-button>
        </div>
        <div class="line"></div>
        <div class="column watch">
            <h1 class="title is-3">FOR<br>
            BOTH</h1>
            <b-button type="button" @click="redirect" native-type="submit">Look</b-button>
        </div>
      </div>
    </div>
    <div class="content content1">
      <div class="container wrapper">
      </div>
      <div class="container collection">
        <div class="show">
          <h2>Collections</h2>
          <b-button type="button is-dark" @click="redirect" native-type="submit">Find</b-button>
        </div>
      </div>
      <div class="container content1">
            <div class="columns">
              <div class="column photo">
            </div>
            <div class="column text1">
              <div>
                <h1 class="title is-2">UNIQUE<br>
                <span class="laikrodis">WATCHES</span></h1>
                <b-button class='button mygtukas' type="is-dark" outlined @click="redirect" native-type="submit">Look</b-button>
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
        { src: 'https://images.pexels.com/photos/125779/pexels-photo-125779.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { src: 'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { src: 'https://images.pexels.com/photos/128206/pexels-photo-128206.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' },
        { src: 'https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500' }
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
.columns, .column{
  margin: 0;
  padding: 0;
}
.carousel img{
  height: 550px;
  width: 100%;
}
.text{
  display: flex;
  align-items: center;
  padding-bottom: 1em;
}
.laikrodis{
  margin-left: 30px;
}
.watch{
  text-align: center;
  margin-top: 20px;
}
.button{
  border: none;
}
.mygtukas{
  border: 1px solid black;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 35px;
}
.content h2{
  margin: 0;
  padding: 0;
}
.button::after{
    content: "\276F";
    font-size: .8em;
    display: inline-block;
    padding-left: 15px;
}
.line{
    content: "";
    display: block;
    background-color: #e6e6e6;
    width: 1px;
    height: 90px;

}
.content{
  background-color: #eee;
}
.collection{
  margin: 0 auto;
  background: #fff;
}
.show{
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  width: 85%;
}
.wrapper{
  margin: 0 auto;
  background-image: url('https://www.vacheron-constantin.com/content/dam-import/vac/a9c9/11f0/2038102.png.scale.1180.380.jpeg');
  background-size: cover;
  background-position: center;
  height: 350px;
}
.content1{
  margin-top: 15px;
}
.photo{
  background-image: url('https://images.unsplash.com/photo-1482775907821-a56ec43344fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80');
  background-size: cover;
  height: 550px;
}
.text1{
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 550px;
}
</style>
