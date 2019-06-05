import express from 'express'
import axios from 'axios'
import {JWT_KEY} from '../store/auth.js'

const config = require('../nuxt.config.js')
// Create express router
const router = express.Router()

// Transform req & res to have the same API as express
// So we can use res.status() & res.json()
let app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

// Add POST - /api/login
router.post('/login', async (req, res) => {
	try {
	  const response = await axios.post(`${config.env.backendUrl}/login`, req.body)
	  req.session[JWT_KEY] = response.data.token
	  return res.json(response.data)
	} catch (e) {
	  console.error(e.message)
	  return res.status(401).json(e.response.data)
	}
})

// Add POST - /api/logout
router.post('/logout', (req, res) => {
  delete req.session[JWT_KEY]
  res.json({ ok: true })
})

router.get('/test', (req, res) => {
  res.json({ ok: true })
})

// Export the server middleware
export default {
  path: '/api',
  handler: router
}
