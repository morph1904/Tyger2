<template>
  <v-app>
    <Navbar/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer/>
  </v-app>
</template>

<script>
import Navbar from './views/partials/Navbar'
import Footer from './views/partials/Footer'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
 data: () => ({
    drawer: null
  })
}
</script>
