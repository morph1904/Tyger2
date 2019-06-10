export const snackbar = {
    state: {
        snack: '',
        color: ''
    },
    mutations: {
        setSnack (state, {snack, color, btnColor}) {
            state.snack = snack
            state.color = color
          }
    }
}
