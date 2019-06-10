import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import 'vuetify/dist/vuetify.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';
import router from './router/router';
import VeeValidate from 'vee-validate';
import store from './store/index';
let root = ""
if(process.env.NODE_ENV == "development"){
    root = "http://localhost:8000";
} else {
    root = '/api/';
}

Vue.use(VeeValidate);

Vue.router = router;
Vue.config.productionTip = false;
Vue.prototype.$eventHub = new Vue();
Vue.use(VueAxios, axios);
Vue.axios.defaults.baseURL = root;
Vue.use(VueAuth, {
    auth: {
        request: function(req, token) {
            if (req.url.endsWith('api-token-refresh/')) {
                req.data = {
                    'token': localStorage.token
                }
            }
            this.options.http._setHeaders.call(this, req, {
                Authorization: 'JWT ' + token
            });
        },
        response: function(res) {
            if (res.request.responseURL.endsWith('api-token-auth/') && res.request.response.status === 200) {
                localStorage.username = res.data.user.username
            }
            if (res.data.non_field_errors) {
                if (res.data.non_field_errors[0] === 'Signature has expired.') {
                    localStorage.removeItem('token')
                    this.$router.push('login')
                }
            }
            

            return res.data.token

        }
    },
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    loginData: {
        url: 'api-token-auth/',
        method: 'POST',
        redirect: 'home',
        fetchUser: false
    },
    tokenDefaultName: 'token',
    refreshData: {
        url: 'api-token-refresh/',
        method: 'POST',
        enabled: true,
        interval: 2,
        data: {
            'token': localStorage.token
        }
    },
    fetchData: {
        enabled: false
    },

});


new Vue({
    router,
    VueAxios,
    store,
    render: h => h(App),
}).$mount('#app');