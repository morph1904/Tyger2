// import Vue from 'vue'
import Toast from "~/components/Toast.js"

// Vue.use(Toast)

export default (ctx, inject) => {
    let $toast = new Toast()
    inject('toast', $toast)
}
