<template>
  <v-snackbar v-model="show" auto-height :color="color">
    {{message}}
    <v-btn flat @click.native="show = false">Close</v-btn>
  </v-snackbar>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      message: '',
      color: '',
    }
  },
  created: function () {
    this.$store.watch(state => state.snackbar.snack, () => {
      const msg = this.$store.state.snackbar.snack
      if (msg !== '') {
        
        this.message = this.$store.state.snackbar.snack
        this.color = this.$store.state.snackbar.color
        this.show = true
        this.$store.commit('setSnack', {snack: '', color: ''})
      }
    })
  }
}
</script>