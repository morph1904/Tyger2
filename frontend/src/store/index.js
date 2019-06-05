import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);
import { addresses } from './modules/addresses';
import { user } from './modules/user';
import { apps } from './modules/apps';
import { dns } from './modules/dns';
import { snackbar } from './modules/snackbar'

let initialState = {
  user: { ...user.state },
  addresses: {...addresses.state},
  apps: {...apps.state},
  dns: {...dns.state},
  snackbar: {...snackbar.state}
}

export default new Vuex.Store({

  modules: {
    user,
    addresses,
    apps,
    dns,
    snackbar
},
mutations: {
  reset (state) {
    Object.keys(state).forEach(key => {
      Object.assign(state[key], initialState[key])
    })
  }
}
});
