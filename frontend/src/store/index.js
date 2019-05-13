import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import apps from './modules/apps'
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    apps,
  },
});
