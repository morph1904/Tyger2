<template>
  <div class="columns">
    <div class="column is-4 is-offset-4">
      <card title="Register" icon="user-plus">
        <form @submit="makeRegister">
          <b-field label="First Name">
            <b-input
              type="text"
              v-model="first_name"
              maxlength="30"
              required
              :has-counter="true"
            ></b-input>
          </b-field>

          <b-field label="Last Name">
            <b-input
              type="text"
              v-model="last_name"
              maxlength="30"
              required
              :has-counter="true"
            ></b-input>
          </b-field>

          <b-field label="Email">
            <b-input
              type="email"
              icon="envelope"
              required
              v-model="email"
            ></b-input>
          </b-field>

          <div class="columns">
            <div class="column">
              <b-field label="Password">
                <b-input
                  type="password"
                  v-model="password"
                  class="is-half"
                  icon="key"
                  minlength="6"
                  required
                  maxlength="20"
                  :has-counter="false"
                  password-reveal
                ></b-input>
              </b-field>
            </div>
            <div class="column">
              <b-field label="Confirm Password">
                <b-input
                  type="password"
                  v-model="cpassword"
                  icon="key"
                  minlength="6"
                  required
                  maxlength="20"
                  :has-counter="false"
                  password-reveal
                ></b-input>
              </b-field>
            </div>
          </div>
          <div class="has-text-danger has-text-centered">{{error}}</div>
          <button type="submit" :class="['button', 'is-primary', 'is-fullwidth', {'is-loading': pending}]">Register</button>
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
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        cpassword: '',
        pending: false,
        error: '',
      };
    },
    methods: {
      makeRegister (e) {
        e.preventDefault();
        this.pending = true;
        this.$store.dispatch('register', this)
          .then(() => {
            this.pending = false;
            this.$router.push({name: 'home'});
          })
          .catch(err => {
            this.error = err;
            this.pending = false;
          });
      },
    },
    components: {
      'card': Card,
    },
  };
</script>
