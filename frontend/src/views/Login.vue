<template>
  <v-container>
    <v-flex xs12 md6 offset-md3>
      <v-card>
        <v-card-title primary-title>
          <h2>Tyger2 Login</h2>
        </v-card-title>
        <v-layout align-center justify-center row wrap>
        <v-flex xs12 md12 pa-5>
          <v-form pa-5>
        <v-text-field label="Username" append-icon="face" placeholder="Username" v-model="username"></v-text-field>
        <v-text-field label="Password" append-icon="lock" placeholder="Password" type="password" v-model="password"></v-text-field>
        <div class="has-text-danger has-text-centered">{{error}}</div>
        <v-btn @click="makeLogin">Login</v-btn>
      </v-form>
        </v-flex>
        </v-layout>
      </v-card>
      
    </v-flex>
  </v-container>
</template>

<script>
 

  export default {
    data: function () {
      return {
        username: '',
        password: '',
        error: '',
        pending: false,
      };
    },
    methods: {
      makeLogin (e) {
        e.preventDefault();
        this.pending = true;
        this.$store.dispatch('login', this)
          .then(() => {
            this.pending = false;
            this.$router.push({name: 'home'});
          })
          .catch(err => {
            this.pending = false;
            this.error = err;
          });
      },
    },
    
  };
</script>
