import jwtDecode from 'jwt-decode';

const API_URL = process.env.backendUrl;

export const JWT_KEY = 'jwt';
export const NAMESPACE = 'auth'

export const ACTIONS = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
}

export const MUTATIONS = {
    SET_USER: 'SET_USER',
    RESET_USER: 'RESET_USER',
}

export const STATE = {
    USER: 'USER',
    TOKEN: 'TOKEN',
}

export const state = () => ({
    [STATE.USER]: null,
    [STATE.TOKEN]: null,
})

export const mutations = {
    [MUTATIONS.SET_USER](state, token) {
        state[STATE.TOKEN] = token
        this.$axios.setToken(token, 'Bearer')
        state[STATE.USER] = jwtDecode(token)
    },
    [MUTATIONS.RESET_USER](state) {
        state[STATE.USER] = null;
        state[STATE.TOKEN] = null;
        this.$axios.setToken(false)
    },
}

export const actions = {
    async [ACTIONS.LOGIN]({commit, state}, {username, password}) {
        try {
            const response = await this.$axios.$post(`api/login`, {
                username: password,
                password: username
            })
            commit(MUTATIONS.SET_USER, response.token)
        } catch (e) {
            console.error(e)
            commit(MUTATIONS.RESET_USER)
        }
    },
    async [ACTIONS.LOGOUT]({commit}) {
        await this.$axios.$post(`api/logout`)
        commit(MUTATIONS.RESET_USER)
    },
}
