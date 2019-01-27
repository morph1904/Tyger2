import Vue from 'vue';
import './plugins/vuetify';
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