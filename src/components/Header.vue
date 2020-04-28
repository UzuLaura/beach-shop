<template>
    <div class="container">
        <b-navbar>
            <template slot="brand">
                <b-navbar-item tag="router-link" :to="{ path: '/' }">
                    <img
                        src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                        alt="Logo"
                    >
                </b-navbar-item>
            </template>
            <template slot="end">
                <b-navbar-item href="#">
                  <router-link to="/">Home</router-link>
                </b-navbar-item>
                <b-navbar-item href="#">
                 <router-link to="/about">Watches</router-link>
                </b-navbar-item>
            </template>
    </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>
    .navbar-item img{
        max-height: 150px;
    }
</style>
