<template>
    <div class="box">
      <h1 class="is-size-1">{{user.first_name}} {{user.last_name}}</h1>
      <p>Email: <em>{{user.email}}</em></p>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    computed: mapGetters(['user']),
  };
</script>
