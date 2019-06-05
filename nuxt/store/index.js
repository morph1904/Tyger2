import {DEFAULT_LOCALE} from '~/middleware/i18n'

export const state = () => ({
	sidebar: false,
	locale: DEFAULT_LOCALE
})

export const mutations = {
	toggleSidebar(state) {
		state.sidebar = !state.sidebar
	}
}

export const actions = {}
