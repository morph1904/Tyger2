<template>
  <div v-if="$auth.check()">
    <v-navigation-drawer dark class="blue-grey darken-3" clipped v-model="drawer" app>
      <v-toolbar flat class="blue-grey darken-4">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img :src="require('@/assets/users.png')">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title class="white--text">Hi, {{ username }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pa-1" dense v-for="link in links" :key="link.text">
        <v-layout row wrap>
          <v-flex xs8 offset-xs2>
            <div class="text-xs-center">
              <v-btn class="accent" block round router :to="link.route">
                <v-icon class="px-1">{{ link.icon }}</v-icon>
                {{ link.text }}
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-list>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs8 offset-xs2>
          <div class="text-xs-center">
            <v-btn class="accent" block round>
              <v-icon class="px-1">timelapse</v-icon>Restart Proxy
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
    </v-navigation-drawer>

    <v-toolbar color="deep-orange" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-img :src="require('@/assets/TygerLogo.png')" height="47px" width="190px"></v-img>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-menu flat offset-y>
          <v-btn flat slot="activator">
            <v-icon>menu</v-icon>Menu
          </v-btn>
          <v-list>
            <v-list-tile v-for="(link, index) in links" :key="index" :to="link.route">
              <v-list-tile-title>
                <v-icon>{{ link.icon }}</v-icon>
                {{ link.text }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn flat @click="logout">
          <v-icon>lock</v-icon>logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    drawer: false,
    
    links: [
      { route: "/", text: "Home", icon: "home" },
      { route: "apps", text: "Applications", icon: "apps" },
      { route: "addresses", text: "Addresses", icon: "domain" }
    ]
  }),
  computed: {
   ...mapGetters({
     username: 'getUser'
   })
  },
  created(){

  },
  methods: {
    logout() {
                this.$auth.logout({
    makeRequest: false,
    data: {}, // data: {} in axios
    success: function () {
      this.$store.dispatch('logout')
    },
    error: function () {},
    redirect: '/login',
    // etc...
});
            },
  }
};
</script>
