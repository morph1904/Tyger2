<template>
 <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>
      <v-img :src="logo.src"></v-img>
      Title
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <span v-if="isLogged"> Welcome, <b> {{ user.email }} </b> </span>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat v-if="!isLogged" to="login">Login</v-btn>
      <v-btn flat v-if="isLogged" to="logout">Logout</v-btn>
      <v-btn flat>Link Two</v-btn>
      <v-btn flat>Link Three</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    data () {
      return {
        logo: [
          { src: require('@/assets/logo.png') }
        ]
      };
    },
    computed: mapGetters(['isLogged', 'user']),
    methods: {
      logout () {
        this.$store.dispatch('logout');
        this.$router.push({name: 'welcome'});
      }
    },
  };
</script>
