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
    getEndpoints({ commit }) {
      axios.get("endpoint/").then(({ data }) => {
        if (data) {
          commit('GET_ENDPOINTS', data)
        }
      })
        .catch(() => {
          commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
        })
    },
    addEndpoint({ commit, dispatch }, data) {
      axios
        .post("endpoint/", data)
        .then(({ data }) => {
          //dispatch('getEndpoints')
          commit('setSnack', {snack: "Endpoint " + data.url + " was created!", color: 'success'})
        })
        .catch(() => {
          commit('setSnack', {snack: "Could not save the proxy! Please check your data and try again", color: 'error'})
        });
    },
    updateEndpoint({ commit, dispatch }, data) {
      axios.patch("endpoint/" + data.id + "/", data)
        .then(({ response }) => {
          dispatch('getEndpoints')
          commit('setSnack', {snack: "Endpoint " + data.url + " was updated!", color: 'success'})
        })
    },
    deleteEndpoint({ commit, dispatch }, data) {
      let endpoint = data
      axios.delete("endpoint/" + data.id + "/", data)
        .then(({ data }) => {
          dispatch('getEndpoints')
          commit('setSnack', { snack: "Endpoint " + data.url + " was deleted!", color: 'warning'})
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

