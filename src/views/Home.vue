<template>
  <section>
    <b-carousel class="carousel">
        <b-carousel-item v-for="(carousel, i) in carousels" :key="i">
          <img :src="carousel.src"/>
        </b-carousel-item>
    </b-carousel>
    <div class="container">
      <div class="columns">
          <div class="column">
            <h1 class="title is-3">Laikrodziai<br>
            Vyrams</h1>
            <button class="button" @click="redirect" type="submit">Ziureti</button>
        </div>
         <div class="column">
            <h1 class="title is-3">Laikrodziai<br>
            Moterims</h1>
            <button class="button" @click="redirect" type="submit">Ziureti</button>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="wrapper">
      </div>
      <div class="collection">
        <div class="show">
          <h2 class="title is-3">Kolekcija</h2>
          <button class="button is-primary" type="submit">Ieskoti</button>
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
      this.$router.push('/about')
    }
  }
}
</script>
<style scoped>
.carousel img{
  height: 550px;
  width: 100%;
}
.columns{
  height: 200px;
  display: flex;
  align-items: center;
}
.column{
  text-align: center;
  margin-top: 20px;
}
.button{
  border: none;
}
.button::after{
    content: "\276F";
    font-size: .8em;
    display: inline-block;
    padding-left: 15px;
    transition: -webkit-transform .3s ease;
    transition: transform .3s ease;
    transition: transform .3s ease,-webkit-transform .3s ease;
}
.column:after{
    content: "";
    display: block;
    background-color: #e6e6e6;
    width: 1px;
    height: 90px;
    position: absolute;
    right: 50%;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);

}
.content{
  background-color: #eee;
}
.collection{
  width: 80%;
  margin: 0 auto;
  background: #fff;
}
.show{
  width: 85%;
  margin: 0 auto;
  display: flex;
  padding-top: 15px;
  justify-content: space-between;
}
.wrapper{
  width: 80%;
  margin: 0 auto;
  background-image: url('https://www.vacheron-constantin.com/content/dam-import/vac/a9c9/11f0/2038102.png.scale.1180.380.jpeg');
  background-size: cover;
  height: 300px;
}
</style>
