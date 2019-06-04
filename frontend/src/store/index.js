import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import apps from './modules/apps';
import main from './modules/main';
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    user,
    main
  },
});
