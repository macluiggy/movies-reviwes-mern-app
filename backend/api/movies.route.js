import express from 'express'
import MoviesController from './movies.controller.js'
import ReviewsController from './reviews.controller.js'

const router = express.Router() // obten acceso al router de express
//router.route('/').get((req, res) => res.send('hello world'))
router.route('/').get(MoviesController.apiGetMovies)

router.route("/review")
		.post(ReviewsController.apiPostReview)
		.put(ReviewsController.apiUpdateReview)
		.delete(ReviewsController.apiDeleteReview)
		.get(ReviewsController.apiGetReview)

router.route('/id/:id')
		.get(MoviesController.apiGetMovieById)

router.route('/ratings')
		.get(MoviesController.apiGetRatings)

export default router