<template>
  <nav class="navbar is-light" style="margin-bottom: 10px;">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="https://image.flaticon.com/icons/png/512/25/25694.png" alt="Logo" >
      </router-link>

      <button class="button navbar-burger">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
    <div v-if="isLogged" class="navbar-menu">
      <div class="navbar-end">
        <b-dropdown position="is-bottom-left">
          <a class="navbar-item" slot="trigger">
            <span>Welcome, <b>{{ user.email }}</b></span>
            <b-icon icon="angle-down"></b-icon>
          </a>
          <b-dropdown-item has-link>
            <router-link to="/profile">
              <b-icon icon="user"></b-icon>
              Profile
            </router-link>
          </b-dropdown-item>
          <hr class="dropdown-divider">
          <b-dropdown-item value="logout" @click="logout">
              <b-icon icon="sign-out"></b-icon>
              Logout
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
    <div v-else class="navbar-menu">
      <div class="navbar-end">
        <router-link to="login" class="is-tab navbar-item">Login</router-link>
        <router-link to="register" class="is-tab navbar-item">Register</router-link>
      </div>
    </div>

  </nav>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters(['isLogged', 'user']),
    methods: {
      logout () {
        this.$store.dispatch('logout');
        this.$router.push({name: 'welcome'});
      }
    },
  };
</script>
