import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Apps from '../views/Apps.vue';
import Addresses from '../views/Addresses.vue';
import Logs from '../views/Logs.vue';
import PageNotFound from '../components/Utility/PageNotFound.vue';


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
      path: '/addresses',
      name: 'Addresses',
      component: Addresses,
      meta: {auth: true}
    },
    {
      path: '/logs',
      name: 'Logs',
      component: Logs,
      meta: {auth: true}
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    { 
      path: "*", 
      component: PageNotFound 
    }
  ]
});
export default router;