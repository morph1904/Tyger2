const nodeExternals = require('webpack-node-externals')
const resolve = (dir) => require('path').join(__dirname, dir)
import bodyParser from 'body-parser'
import session from 'express-session'
import dotenv from 'dotenv'
dotenv.config()


module.exports = {
	/*
	** Headers of the page
	*/
	head: {
		title: 'frontend',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: 'Nuxt.js + Vuetify.js project' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
		]
	},
	env: {
		baseUrl: process.env.BASE_URL,
		backendUrl: process.env.JH_API_URL
	},
	plugins: [
		'~/plugins/vuetify.js',
		'~/plugins/toast.js',
		'~/plugins/i18n.js',
		'~/plugins/axios.js',
		'~/plugins/auth.js'
	],
	middleware: ['~/middleware/i18n', '~/middleware/auth'],
	serverMiddleware: [
		// body-parser middleware
		bodyParser.json(),
		// session middleware
		session({
			secret: 'super-secret-key',
			resave: false,
			saveUninitialized: false,
			cookie: { maxAge: 60000 }
		}),
		'~/api'
	],
	modules: [
		'@nuxtjs/axios',
	],
	axios: {},
	css: [
		'~/assets/style/app.styl'
	],
	/*
	** Customize the progress bar color
	*/
	loading: { color: '#3B8070' },
	/*
	** Build configuration
	*/
	build: {
		babel: {
			plugins: [
				["transform-imports", {
					"vuetify": {
						"transform": "vuetify/es5/components/${member}",
						"preventFullImport": true
					}
				}]
			]
		},
		// vendor: [
		//   '~/plugins/vuetify.js'
		// ],
		extractCSS: true,
		/*
		** Run ESLint on save
		*/
		extend(config, ctx) {
			// if (ctx.isDev && ctx.isClient) {
			//   config.module.rules.push({
			//     enforce: 'pre',
			//     test: /\.(js|vue)$/,
			//     loader: 'eslint-loader',
			//     exclude: /(node_modules)/
			//   })
			// }
			if (ctx.isServer) {
				config.externals = [
					nodeExternals({
						whitelist: [/^vuetify/]
					})
				]
			}
		}
	}
}
