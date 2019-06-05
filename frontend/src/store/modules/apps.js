import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/';
import VuetifyToast from 'vuetify-toast-snackbar'

Vue.use(VuetifyToast, {
	x: 'right', // default
	y: 'bottom', // default
	color: 'info', // default
	icon: 'info',
	timeout: 3000, // default
	dismissable: true, // default
	autoHeight: false, // default
	multiLine: false, // default
	vertical: false, // default
	shorts: {
		custom: {
			color: 'purple'
		}
	},
	property: '$toast' // default
});
export const apps = {
  state:{
    apps: [],
    appCount: null
  },

  actions: {
    getApps({ commit }) {
      axios.get("apps/").then(({ data }) => {
        if (data) {
          commit('GET_APPS', data)
        }
      })
        .catch(() => {
          commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
        })
    },
    addApp({ commit, dispatch }, data) {
      axios
        .post("apps/", data.app)
        .then(({ data }) => {
          dispatch('getApps')
          commit('setSnack', {snack: "App " + data.name + " (" + data.url + ")" + " was created!", color: 'success'})
        })
        .catch(() => {
          commit('setSnack', {snack: "Could not save the proxy! Please check your data and try again", color: 'error'})
        });
    },
    updateApp({ commit, dispatch }, data) {
      axios.patch("apps/" + data.id + "/", data)
        .then(({ response }) => {
          dispatch('getApps')
          commit('setSnack', {snack: "App " + data.name + " (" + data.url + ")" + " was updated!", color: 'success'})
        })
    },
    deleteApp({ commit, dispatch }, data) {
      let app = data
      axios.delete("apps/" + data.id + "/", data)
        .then(({ data }) => {
          dispatch('getApps')
          commit('setSnack', { snack: "App " + app.name + " (" + app.url + ")" + " was deleted!", color: "warning" })
        })
    },
  },
  mutations: {
    GET_APPS(state, data) {
      state.apps = data.results;
      state.appCount = data.count;
    },
  },
  getters: {
    showApps( state ){
      return state.apps
    },
    showAppCount( state ){
      return state.appCount
    }
  }
}

