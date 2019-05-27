import axios from 'axios';
import config from '../../config';
import { USER_LOGOUT, USER_AUTH_SUCCESS } from '../mutation-types';

const state = {
  token: sessionStorage.getItem('token') || '',
  user: JSON.parse(sessionStorage.getItem('user')) || {},
  alertmessage:'',
  alerttype:''
};

const getters = {
  isLogged: state => !!state.token,
  user: state => state.user
};

const actions = {
  login (store, { username, password }) {
    return new Promise((resolve, reject) => {
      axios.post(window.settings.API.LOGIN, {
        username,
        password,
      }).then(({ data }) => {
        if (data.token) {
          store.commit(USER_AUTH_SUCCESS, { user: data.user, token: data.token });
          resolve();
        } else {
          reject(data.message);
        }
      }).catch(() => {
        reject('Error sending request to server!');
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
  logout (store) {
    store.commit(USER_LOGOUT);
  },
};

const mutations = {
  [USER_AUTH_SUCCESS] (store, { user, token }) {
    store.user = user;
    store.error = '';
    store.token = token;
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user));
  },
  [USER_LOGOUT] (store) {
    store.user = {};
    store.token = '';
    sessionStorage.clear();
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
