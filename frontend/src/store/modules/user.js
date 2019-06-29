import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/';

export const user = {
  state: {
    token: sessionStorage.getItem('token') || '',
    username:'',
  },
  getters: {
    isLogged: state => !!state.token,
    getUser ( state ){
      return state.username
    }
  },
  actions: {
    setUsername({commit}, username){
      commit('SET_USERNAME', username.username)
    },

    login ({ commit }, { username, password }) {
      return new Promise((resolve, reject) => {
        axios.post(window.settings.API.LOGIN, {
          username,
          password,
        }).then(({ data }) => {
  
          if (data.token) {
            commit(USER_AUTH_SUCCESS, { user: username, token: data.token });
            resolve();
          } else {
            reject(data.message);
          }
        }).catch(() => {
          commit('setSnack', {snack: "Could not communicate with the backend!", color: 'error'})
        });
      });
    },
    register (store, { first_name, last_name, email, password, cpassword }) {
      return new Promise((resolve, reject) => {
        if (password !== cpassword) reject(new Error('Passwords do not match'));
        axios.post(window.settings.API.REGISTER, {
          first_name,
          last_name,
          email,
          password,
        }).then(({ data }) => {
          if (data.success) {
            store.commit(USER_AUTH_SUCCESS);
          } else {
            reject(data.message);
          }
        }).catch(err => {
          reject(err);
        });
      });
    },
    logout ({ commit }) {
      commit('setSnack', {snack: "You have been logged out.", color: 'warning'})
      commit('USER_LOGOUT');
      commit('reset')
    },
  },
  mutations: {
    USER_AUTH_SUCCESS(state, { user, token }) {
      state.error = '';
      state.token = token;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));
    },
    USER_LOGOUT(state) {
      
      state.username = {};
      state.token = '';
      sessionStorage.clear();
      localStorage.clear();
    },
    SET_USERNAME(state, username) {
      state.username = username
    }
  }
}