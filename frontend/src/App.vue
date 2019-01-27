<template>
  <v-app class="blue-grey lighten-2">
    <div >
    <Navbar v-if="isLogged"/>
    <v-content>
      <Alert/>
      <router-view></router-view>
    </v-content>
    <Footer/>
    </div>
  </v-app>
</template>

<script>
import Navbar from './views/partials/Navbar'
import Footer from './views/partials/Footer'
import Alert from './views/partials/Alert'

import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Alert
  },
 data: () => ({
    drawer: null,
  }),
  
  computed: mapGetters(['isLogged', 'user']),
  methods:{
    }
  
}
</script>
