<template>
<v-form>
  <v-container>
    <v-flex xs12 md4>
      <v-text-field label="Username" append-icon="face" placeholder="Username" v-model="username"></v-text-field>
      <v-text-field label="Password" append-icon="lock" placeholder="Password" type="password" v-model="password"></v-text-field>
      <div class="has-text-danger has-text-centered">{{error}}</div>
      <v-btn @click="makeLogin">Login</v-btn>
    </v-flex>
  </v-container>
  
</v-form>
</template>

<script>
  import Card from '../layout/Card.vue';

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
    components: {
      'card': Card,
    },
  };
</script>
