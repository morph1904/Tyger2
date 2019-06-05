export default function ({app, $axios, redirect}) {
    $axios.setHeader('Accept', 'application/json')
    $axios.setHeader('X-Accept-Version', 'v1')
    $axios.setHeader('crossDomain', true)
    $axios.withCredentials = true;

    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)

        if (code === 404) {
            app.$toast.error('Záznam nenalezen')
            return;
        }
        if (error.response.data.message) {
            app.$toast.error(error.response.data.message)
        } else {
            app.$toast.error(`Neočekávaná chyba ${code}`)
        }
    })
}
