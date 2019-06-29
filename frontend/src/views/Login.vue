<template>

  <v-container>

    <v-flex xs12 md6 offset-md3>
      <v-card>
        <v-card-title primary-title>
          <h2>Tyger2 Login</h2>
        </v-card-title>
        <v-layout align-center justify-center row wrap>
          <v-flex xs12 md12 pa-5>
            <v-form pa-5 @submit.prevent="login">
              <v-text-field
                label="Username"
                append-icon="face"
                placeholder="Username"
                v-model="username"
              ></v-text-field>
              <v-text-field
                label="Password"
                append-icon="lock"
                placeholder="Password"
                type="password"
                v-model="password"
              ></v-text-field>
              <div class="has-text-danger has-text-centered">{{error}}</div>
              <v-btn type="submit">Login</v-btn>
            </v-form>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  data: function() {
    return {
      username: "",
      password: "",
      error: "",
      pending: false,
      alert: false
    };
  },
  
  computed: {},
  methods: {
    login: function() {
      const password = this.password;
      const username = this.username;
      this.$auth.login({
        data: { username: username, password: password },
        error: function () {
           this.$store.commit('setSnack', {snack: "Error! Please check your username and password and try again. ", color: 'error'})
           },
        success: function () {
         // this.$store.commit('SET_ALERT', {message: "", type: ""})
          this.$store.dispatch('setUsername', {username: this.username })
          this.$store.commit('setSnack', {snack: "Success! You are now logged in as " + this.username , color: 'success'})
           
        },
        rememberMe: true,
        redirect: "/"
      });
    }
  },

  
};
</script>
