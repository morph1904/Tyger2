<template>
  
    <v-alert
      v-model="alert"
      dismissible
      :color="alerttype"
      transition="scale-transition"
    >{{ alertmessage }}</v-alert>
  
</template>

<script>
import { mapState } from 'vuex'
export default {

  data() {
    return {
     alert: false,
    //  type: null,
    //  message: null
    };
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      switch(mutation.type){
      case 'SET_ALERT':
        const msg = state.alertmessage;
        if (msg !== ''){
          this.alert = true
          //this.message = this.$store.state.alert.message
          //this.type = this.$store.state.alert.type
          //this.$store.commit('SET_ALERT', {message:'', type:''})
      }
      break;
    }
  }
    )},
  
 computed: mapState({
     alertmessage: 'alertmessage',
     alerttype: 'alerttype'
    }),
  beforeDestroy() {
    this.$eventHub.$off("new-alert");
  },
  methods: {
   // processAlert(data) {
   //   this.alert = true;
   //   this.type = data.type;
   //   this.message = data.message;
   // }
  }
};
</script>
