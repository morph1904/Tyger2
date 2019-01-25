<template>
  <div id="app">
    <navbar/>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import Navbar from './components/partials/Navbar.vue';

  export default {
    name: 'app',
    components: {
      'navbar': Navbar,
    },
  };
</script>
<style src='vuetify/dist/vuetify.min.css'>
    /* global styles */
</style> 