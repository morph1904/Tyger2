<template>
  <div class="columns">
    <div class="column is-4 is-offset-4">
      <card title="Login" icon="sign-in">
        <form @submit="makeLogin">
          <b-field label="Username">
            <b-input
              type="text"
              name="sandel"
              icon="envelope"
              required
              v-model="username"
            ></b-input>
          </b-field>

          <b-field label="Password">
            <b-input
              type="password"
              v-model="password"
              class="is-half"
              icon="key"
              required
              password-reveal
            ></b-input>
          </b-field>
          <div class="has-text-danger has-text-centered">{{error}}</div>
          <button type="submit" :class="['button', 'is-primary', 'is-fullwidth', {'is-loading': pending}]">Login</button>
        </form>
      </card>
    </div>
  </div>

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
