import Vue from 'vue';
import Vuex from 'vuex';



Vue.use(Vuex);
import { addresses } from './modules/addresses';
import { user } from './modules/user';
import { apps } from './modules/apps';
import { dns } from './modules/dns';
import { utility } from './modules/utility';
import { snackbar } from './modules/snackbar';
import { logs } from './modules/logs';
import { endpoints } from './modules/endpoint';

let initialState = {
  user: { ...user.state },
  addresses: {...addresses.state},
  apps: {...apps.state},
  dns: {...dns.state},
  logs:{...logs.state},
  snackbar: {...snackbar.state},
  endpoints: {...endpoints.state}
}

export default new Vuex.Store({

  modules: {
    user,
    addresses,
    apps,
    dns,
    utility,
    logs,
    snackbar,
    endpoints
},
mutations: {
  reset (state) {
    Object.keys(state).forEach(key => {
      Object.assign(state[key], initialState[key])
    })
  }
}
});
