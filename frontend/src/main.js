import Vue from 'vue';
import './plugins/vuetify';
<<<<<<< HEAD
import App from './App.vue';
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';

import router from './router/router';
import VeeValidate from 'vee-validate';

Vue.use(VeeValidate);
Vue.router = router;
Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = 'http://localhost:8000/';
Vue.use(VueAuth, {
  //auth: require('./plugins/auth.js'),
  auth: {
    request: function (req, token) {
      if (req.url.endsWith('api-token-refresh/')) {
        req.data = {'token': localStorage.token}
      }
      this.options.http._setHeaders.call(this, req, { Authorization: 'JWT ' + token });
    },
    response: function (res) {
      if (res.request.responseURL.endsWith('api-token-auth/')){
        localStorage.username = res.data.user.username
      }
      
        return res.data.token
      
    }
  },
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {url: 'api-token-auth/', method: 'POST', redirect: 'home', fetchUser: false},
  tokenDefaultName: 'token',
  refreshData: {url: 'api-token-refresh/', method: 'POST', enabled: true, interval: 2, data:{'token':localStorage.token}},
  fetchData: { enabled: false},
  
});


new Vue({
  router,
  VueAxios,
  render: h => h(App),
}).$mount('#app');
=======
import './plugins/veevalidate';
import App from './App.vue';
import router from './router';
import {
    sync
} from 'vuex-router-sync';
import store from './store';

Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
sync(store, router);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
>>>>>>> 484501520473b429991d298f1fb7342d1a7606ae
