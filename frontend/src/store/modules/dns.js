import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/';

export const dns = {
    state:{
        dns: [],
    },
  
    actions: {
        getDNS({ commit }) {
            axios.get("dns/").then(({
              data
            }) => {
              if (data) {
                  commit('GET_DNS', data)
                
              }
            })
              .catch(() => {
                commit('setSnack', {
               snack: "Could not communicate with the backend!",
               color: "error"
                })
              })
          },
    },
    mutations: {
        GET_DNS(state, data) {
            state.dns = data.results;
          },
    },
    getters: {
      showDNS(state){
          return state.dns
       }
      }
}

  
  