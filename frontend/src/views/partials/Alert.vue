<template>
  <v-container>
    <v-alert
      :value="alert"
      :type="type"
      dismissible
      transition="scale-transition"
      v-on:new-alert="processAlert(data)"
    >{{ message }}</v-alert>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      alert: false,
      type: null,
      message: null
    };
  },
  created() {
    this.$eventHub.$on("new-alert", this.processAlert);
  },

  beforeDestroy() {
    this.$eventHub.$off("new-alert");
  },
  methods: {
    processAlert(data) {
      this.alert = true;
      this.type = data.type;
      this.message = data.message;
    }
  }
};
</script>
