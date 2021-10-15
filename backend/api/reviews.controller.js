import ReviewsDAO from '../dao/reviewsDAO.js'//importamos la clase donde llamaremos a la base de datos

export default class ReviewsController {
	static async apiPostReview (req, res, next) {//el handler para el post request
		try {
			const movieId = req.body.movie_id//el id que ingresa el usuario
			const review = req.body.review//el review
			const userInfo = {//la informacion del ususario que ingreso los dos parametros anteriores
				name: req.body.name,
				_id: req.body.user_id
			}

			const date = new Date()//la fecha en la que creo el post

			//llamamos a la funcion de importado para guardar los datos en la base de datos
			const ReviewResponse = await ReviewsDAO.addReview(
				movieId,
				userInfo,
				review,
				date
			)
			//si todo salio bien, se devuleve el mensaje de exito
			res.json({
				status: "success",
			})
		} catch(e) {//si hubo un error, sen envia el mensaje de error
			res.status(500).json({ error: e.message })
		}
	}

	static async apiUpdateReview (req, res, next) {//funcion para actualizar la reseña
		try {
			//obtenemos los datos ingresados por el ususario
			const reviewId = req.body.review_id
			const review = req.body.review

			//obtnemos la fecha actual
			const date = new Date()

			//llamamos a la funcion para actualiza los datos
			const ReviewResponse = await ReviewsDAO.updateReview(
				reviewId,
				req.body.user_id,
				review,
				date
			)

			//guardamos el error si existe
			var { error } = ReviewResponse
			//si existe el error
			if (error) {
				res.status.json({error})//mostramos la respuesta de error
			}
			if (ReviewResponse.modifiedCount === 0) {//verificamos que haya sido actualizada la reseña
				//si no, se manda el error
				throw new Error("Unable to update review. User may not be original poster"+ReviewResponse.modifiedCount)
			}
			res.json({ status: "success" })//si todo sale bien, se muestra el mensaje de exito
		} catch(e) {//de otra forma el mensaje de error
			res.status(500).json({ error: e.message })
		}
	}

	static async apiDeleteReview (req, res, next) {//para borrar la reseña
		try {
			//los datos ingresados
			const reviewId = req.body.review_id
			const userId = req.body.user_id
			//llama a la funcion para borrar la reseña
			const ReviewResponse = await ReviewsDAO.deleteReview(
				reviewId,
				userId,
			)

			//muestra el mensaje de exito si salio todo bien
			res.json({ status: "success" })
		} catch(e) {
			res.status(500).json({ error: e.message })
		}
	}

	static async apiGetReview (req, res, next) {
		try {
			const reviewId = req.body.review_id
			const userId = req.body.user_id

			const ReviewResponse = await ReviewsDAO.getReview(
				reviewId,
				userId,
			)
			console.log(ReviewResponse)
			res.json({ status: 'success', received: ReviewResponse })
		} catch (e) {
			res.status(500).json({ error: e.message })
		}
	}
}