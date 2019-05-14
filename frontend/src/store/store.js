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
    },
    actions: {
        // START APPS ACTIONS
        getApps({
            commit
        }) {
            axios.get("apps/").then(({
                    data
                }) => {
                    if (data) {
                        this.state.apps = data.results;
                        this.state.appCount = data.count;
                    }
                })
                .catch(() => {
                    store.commit('SET_ALERT', {
                        message: "Could not communicate with the backend!",
                        type: "error"
                    })
                })
        },
        addApp({
            commit
        }, data) {
            let address = data.address
            axios
                .post("apps/", data.app)
                .then(({
                    data
                }) => {
                    store.dispatch('addAddress', address)
                })
                .catch(() => {
                    store.commit('SET_ALERT', {
                        message: "Could not save the proxy! Please check your data and try again",
                        type: "error"
                    })
                });
        },

        updateApp({
            commit
        }, data) {
            axios.patch("apps/" + data.id + "/", data)
                .then(({
                    data
                }) => {
                    store.commit('GET_APPS')
                    store.commit('SET_ALERT', {
                        message: "App " + data.name + " (" + data.url + ")" + " was updated!",
                        type: "success"
                    })
                })
        },

        deleteApp({
            commit
        }, data) {
            let deleted = data
            axios.delete("apps/" + data.id + "/").then(({
                data
            }) => {
                store.commit('SET_ALERT', {
                    message: "App " + deleted.name + " (" + deleted.url + ")" + " was deleted!",
                    type: "warning"
                })
                store.dispatch('getApps')
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

        deleteAddress({
            commit
        }, data) {
            let deleted = data
            axios.delete("addresses/" + data.id + "/").then(({
                data
            }) => {
                store.commit('SET_ALERT', {
                    message: "Address " + deleted.address + " was deleted!",
                    type: "warning"
                })
                store.dispatch('getApps')
            })
        },
        //END ADDRESS ACTIONS

        //START UTILITY ACTIONS
        setAlert({
            commit
        }, data) {
            console.log(data.message)
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
        ADD_APP(state, data) {
            store.dispatch('addApp', data)
        },
        UPDATE_APPS(state, data) {
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