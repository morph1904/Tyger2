import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Apps from '../views/Apps.vue';
import Domains from '../views/Domains.vue';

Vue.use(Router);



const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {auth: true}
    },
    {
      path: '/apps',
      name: 'Apps',
      component: Apps,
      meta: {auth: true}
    },
    {
      path: '/domains',
      name: 'Domains',
      component: Domains,
      meta: {auth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
  ]
});
export default router;