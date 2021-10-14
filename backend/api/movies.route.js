import express from 'express'

const router = express.Router() // obten acceso al router de express
router.route('/').get((req, res) => res.send('hello world'))

export default router