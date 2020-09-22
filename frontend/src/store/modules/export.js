import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/';

export const backup = {
  state:{
    backup: {}
  },

  actions: {
    getBackupData( { commit } ){
      axios.get("export/").then( function( response ){
          console.log(response)
        commit('GET_BACKUP', response.data)
      })
      .catch(function(){
          commit('setSnack', {snack: "Could not communicate with the backend!", color: "error"})
      });
    },
    
},
  mutations: {
    GET_BACKUP( state , data) {
      state.backup = data
    }
  },
  getters: {
    showBackup( state ){
      return state.backup
    },
  }
}

