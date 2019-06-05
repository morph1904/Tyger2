import Vue from 'vue'
import Vuetify, {VSnackbar, VIcon} from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'



Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#FF5722',
    secondary: '#37474F',
    accent: '#263238',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
},
});
