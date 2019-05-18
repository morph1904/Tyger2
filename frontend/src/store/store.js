import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/';

Vue.use(Vuex)

export const store = new Vuex.Store({


    state: {
        alertmessage: '',
        alerttype: '',
        apps: [],
        addresses: [],
        addresCount: null,
        appCount: null,
        addressCount: null, 
        addresses:[],
    },
    actions:{
        getApps ({ commit }) {
            axios.get("apps/").then(({ data }) => {
                if (data){
                  this.state.apps = data.results;
                  this.state.appCount = data.count;
                }
              })
              .catch(() =>{
                store.commit('SET_ALERT', {message: "Could not communicate with the backend!", type: "error"})
              })  
        },
        getAdds ({ commit }) {
          axios.get("addresses/").then(({ data }) => {
              if (data){
                this.state.addresses = data.results;
                this.state.addressCount = data.count;
              }
            })
            .catch(() =>{
              store.commit('SET_ALERT', {message: "Could not communicate with the backend!", type: "error"})
            })  
      },
        addApp ({ commit }, data ){
          //console.log(data)
          let address = data.address
          axios
          .post("apps/", data.app)
          .then(({ data }) => {
              store.dispatch('addAddress', address)
          })
          .catch(() => {
            store.commit('SET_ALERT', {message: "Could not save the proxy! Please check your data and try again", type: "error"})
          });
        },
        addAppSTD ({ commit }, data ){
          //console.log(data)
          axios
          .post("apps/", data.app)
          .then(({ data }) => {
            store.commit('SET_ALERT', {message: "New App created " + data.name, type: "success"})
            store.commit('GET_APPS')
          })
          .catch((e) => {
            //console.log(e)
            store.commit('SET_ALERT', {message: "Could not save the proxy! Please check your data and try again", type: "error"})
          });
        },

        addAddress({ commit }, data){
          let address = data
          axios.post("addresses/", data)
        .then(({ data }) => {
          store.commit('GET_ADDS')
          store.commit('SET_ALERT', {message: "New proxy created from " + address.address + " to " + address.app, type: "success"})
        })
        .catch(() => {
          store.commit('SET_ALERT', {message: "Could not save the proxy! Please check your data and try again", type: "error"})
        });
        },
        addAddSTD({ commit }, data){
          //console.log(data)
          let address = data
          axios.post("addresses/", data)
        .then(({ data }) => {
          store.commit('GET_APPS')
          store.commit('SET_ALERT', {message: "New proxy created from " + address.address + " to " + address.app, type: "success"})
        })
        .catch(() => {
          store.commit('SET_ALERT', {message: "Could not save the proxy! Please check your data and try again", type: "error"})
        });
        },
        updateApp ({ commit }, data ){
            axios.patch("apps/" + data.id + "/", data )
            .then(({ data }) => {
               store.commit('GET_APPS')
               store.commit('SET_ALERT', {message:"App " + data.name + " (" + data.url + ")" + " was updated!", type: "success"})
              })
        },
        //END APPS ACTIONS

        //START ADDRESS ACTIONS
        getAddresses({
            commit
        }) {
            axios.get("addresses/").then(({
                    data
                }) => {
                    if (data) {
                        this.state.addresses = data.results;
                        this.state.addressCount = data.count;
                    }
                })
                .catch(() => {
                    store.commit('SET_ALERT', {
                        message: "Could not communicate with the backend!",
                        type: "error"
                    })
                })
        },
        addAddress({
            commit
        }, data) {
            let address = data
            axios.post("addresses/", data)
                .then(({
                    data
                }) => {
                    store.commit('GET_ADDRESSES')
                    store.commit('SET_ALERT', {
                        message: "New proxy created from " + address.address + " to " + address.app,
                        type: "success"
                    })
                })
                .catch(() => {
                    store.commit('SET_ALERT', {
                        message: "Could not save the proxy! Please check your data and try again",
                        type: "error"
                    })
                });
        },

        updateAddress({
            commit
        }, data) {
            axios.patch("addresses/" + data.id + "/", data)
                .then(({
                    data
                }) => {
                    store.commit('GET_APPS')
                    store.commit('SET_ALERT', {
                        message: "Address " + data.address + " was updated!",
                        type: "success"
                    })
                })
        },

        setAlert({commit}, data){
          //console.log(data.message)
          this.state.alertmessage = data.message
          this.state.alerttype = data.type
        }
        //END UTILITY ACTIONS
    },
    mutations: {
        //START APP MUTATIONS
        GET_APPS(state) {
            store.dispatch('getApps')
        },
        GET_ADDS (state){
          store.dispatch('getAdds')
        },
        ADD_APP (state, data){
          store.dispatch('addApp', data)
        },
        ADD_APPSTD (state, data){
          store.dispatch('addAppSTD', data)
        },
        ADD_ADDSTD (state, data){
          store.dispatch('addAddSTD', data)
        },
        UPDATE_APPS (state, data){
            store.dispatch('updateApp', data)
        },
        DELETE_APP(state, data) {
            store.dispatch('deleteApp', data)
        },

        //START ADDRESS MUTATIONS
        GET_ADDRESSES(state) {
            store.dispatch('getAddresses')
        },
        ADD_ADDRESS(state, data) {
            store.dispatch('addAddress', data)
        },
        UPDATE_ADDRESS(state, data) {
            store.dispatch('updateAddress', data)
        },
        DELETE_ADDRESS(state, data) {
            store.dispatch('deleteAddress', data)
        },


        //START UTILITY MUTATIONS
        SET_ALERT(state, data) {
            store.dispatch('setAlert', data)
        },

    }
})