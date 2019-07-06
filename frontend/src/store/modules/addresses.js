import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/';

export const addresses = {
  state:{
    addresses: [],
    addressCount: null
  },

  actions: {
    getAddresses( { commit } ){
      axios.get("addresses/").then( function( response ){
        commit('GET_ADDS', response.data)
      })
      .catch(function(){
          commit('setSnack', {snack: "Could not communicate with the backend!", color: "error"})
      });
    },
    
    addAddress({ commit, dispatch }, data) {
      let address = data
      axios.post("addresses/", data)
        .then(({ data }) => {
          dispatch('getAddresses');
          commit('setSnack', { snack: "New proxy created from " + address.address + " to " + address.app, color: "success" })
        })
        .catch(() => {
          commit('setSnack', { snack: "Could not save the proxy! Please check your data and try again", color: "error" })
        });
    },
    updateAddress( { commit, dispatch }, data ){
      axios.patch("addresses/" + data.id + "/", data).then(({ data }) => {
          dispatch('getAddresses');
          commit('setSnack', {snack: "Address " + data.address + " was updated!", color: "success" })
        })
    },
    deleteAddress({ commit, dispatch }, data) {
      const add = data
      axios.delete("addresses/" + data.id + "/", data)
        .then(({ data }) => {
          dispatch('getAddresses');
          //store.commit('SET_ALERT', { message: "Address " + add.address + " (" + add.app + ")" + " was deleted!", type: "warning" })
        })
        .catch(() => {
          //store.commit('SET_ALERT', { message: "There was an error! Please check your data and try again", type: "error" })
        });
    },
  },
  mutations: {
    GET_ADDS( state , data) {
      state.addresses = data.results
      state.addressCount = data.count
    }
  },
  getters: {
    showAddresses( state ){
      return state.addresses
    },
    showAddressCount( state ){
      return state.addressCount
    }
  }
}

