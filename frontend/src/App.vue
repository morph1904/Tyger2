<template>
  <v-app class="blue-grey lighten-2">
<<<<<<< HEAD
    <div>
        <div v-if="$auth.ready()">
    <div>
    <Navbar />
=======
    <div >
    <Navbar v-if="isLogged"/>
>>>>>>> 484501520473b429991d298f1fb7342d1a7606ae
    <v-content>
      <Alert/>
      <router-view></router-view>
    </v-content>
    <Footer/>
    </div>
<<<<<<< HEAD
    <div v-if="!$auth.ready()">
            Loading ...
        </div>
    </div>
    </div>
=======
>>>>>>> 484501520473b429991d298f1fb7342d1a7606ae
  </v-app>
</template>

<script>
import Navbar from './views/partials/Navbar'
import Footer from './views/partials/Footer'
import Alert from './views/partials/Alert'
<<<<<<< HEAD
=======

import { mapGetters } from 'vuex';
>>>>>>> 484501520473b429991d298f1fb7342d1a7606ae

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
  
<<<<<<< HEAD
  //computed: mapGetters(['isAuthenticated', 'user']),
=======
  computed: mapGetters(['isLogged', 'user']),
>>>>>>> 484501520473b429991d298f1fb7342d1a7606ae
  methods:{
    }
  
}
</script>
