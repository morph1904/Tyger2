import Vue from 'vue'
import VueI18n from 'vue-i18n'
import {DEFAULT_LOCALE} from '~/middleware/i18n'

Vue.use(VueI18n)

export default ({app, store}) => {
    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    app.i18n = new VueI18n({
        locale: store.state.locale,
        fallbackLocale: DEFAULT_LOCALE,
        messages: {
            'cs': require('~/locales/cs.json'),
        }
    })
}
