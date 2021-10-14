import express from 'express'
import MoviesControllerzzz from './movies.controller.js'

const router = express.Router() // obten acceso al router de express
//router.route('/').get((req, res) => res.send('hello world'))
router.route('/').get(MoviesControllerzzz.apiGetMovies)

export default router