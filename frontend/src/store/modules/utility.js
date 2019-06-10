import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/';


export const utility = {
  actions: {
    reloadProxy({ commit }) {
      axios.get("/addresses/reload/").then(({ data }) => {
        if (data) {
            commit('setSnack', {snack: "Proxy was reloaded!", color: 'success'})
        }
      })
        .catch(() => {
          commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
        })
    },
    
  },
}


