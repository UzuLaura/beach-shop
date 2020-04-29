<template>
  <div class="container">
    <b-navbar>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="../img/logo-watchshop.jpg"
            alt="Logo"
          >
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-navbar-item href="#">
          <router-link class="a-name" to="/">Home</router-link>
        </b-navbar-item>
        <b-navbar-item href="#">
          <router-link class="a-name" to="/products">Watches</router-link>
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    
  }
}
</script>

<style scoped>
.navbar-item img {
  max-height: 100px;
}
.a-name {
  color: #0f7670;
}

</style>
