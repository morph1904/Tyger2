<template>
  <div>
    <h1>Welcome!</h1>
    You can <router-link to="register">Register</router-link>
    or
    <router-link to="login">Login</router-link>
  </div>
</template>

<script>
  export default {
    mounted () {
      console.log(this.$router);
    }
  };
</script>
