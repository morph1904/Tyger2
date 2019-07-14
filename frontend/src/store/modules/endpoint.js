import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/';

export const endpoints = {
  state:{
    endpoints: []
  },

  actions: {
    getEndpoints({ commit }, data) {
      axios.get("endpoint/?address="+ data.id).then(({ data }) => {
        if (data) {
          commit('GET_ENDPOINTS', data)
        }
      })
        .catch(() => {
          commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
        })
    },
    
    addEndpoint({ commit }, data) {
      axios
        .post("endpoint/", data)
        .then(({ data }) => {
          //dispatch('getEndpoints')
          commit('setSnack', {snack: "Endpoint " + data.endpoint + " was created!", color: 'success'})
        })
        .catch(() => {
          commit('setSnack', {snack: "Could not save the proxy! Please check your data and try again", color: 'error'})
        });
    },
    updateEndpoint({ commit, dispatch }, data) {
      console.log(data)
      axios.patch("endpoint/" + data.id + "/", data)
        .then(() => {
          let addr = {
            id: data.addrid
          }
          dispatch('getEndpoints', addr)
          commit('setSnack', {snack: "Endpoint " + data.endpoint + " was updated!", color: 'success'})
        })
    },
    deleteEndpoint({ commit, dispatch }, data) {
      console.log(data)
      axios.delete("endpoint/" + data.id + "/")
        .then(() => {
          let addr = {
            id: data.addrid
          }
          dispatch('getEndpoints', addr)
          commit('setSnack', { snack: "Endpoint " + data.endpoint + " was deleted!", color: 'warning'})
        })
    },
  },
  mutations: {
    GET_ENDPOINTS(state, data) {
      state.endpoints = data.results;
    },
  },
  getters: {
    showEndpoints( state ){
      return state.endpoints
    },
  }
}

