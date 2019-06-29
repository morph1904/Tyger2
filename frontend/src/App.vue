<template>
  <v-app class="blue-grey lighten-2">
    <div>
        <div v-if="$auth.ready()">
    <div>
    <Navbar v-if="$auth.check()"/>
    <v-content>
      
      <Snackbar/>
      <router-view></router-view>
    </v-content>
    <Footer v-if="$auth.check()"/>
    </div>
    <div v-if="!$auth.ready()">
            Loading ...
        </div>
    </div>
    </div>
  </v-app>
</template>

<script>
import Navbar from './views/partials/Navbar'
import Footer from './views/partials/Footer'
import Snackbar from './components/Utility/Snackbar'
export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
    Snackbar
  },
 data: () => ({
    drawer: null,
  }),
  
  //computed: mapGetters(['isAuthenticated', 'user']),
  methods:{
    }
  
}
</script>