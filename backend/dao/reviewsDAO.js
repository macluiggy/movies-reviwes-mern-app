import mongodb from 'mongodb'
//luego de importar mongodb, creamos una variable ObjectId, para luego convertir un id string
//en un objeto MongoDB id despues
const ObjectId = mongodb.ObjectId

//definimos las revies
export let reviews

export default class ReviewsDAO {
	static async injectDB(conn) {
		if (reviews) {//si ya existe
			return//retornamos
		}
		try {
			//si no existe entonces accedemos a la coleccion de la base de datos de las reviews
			//si esta no existe, mongoDB la creara para nosotros automaticamente
			reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
		}
		catch(e) {
			console.error(`unable to establish connection handle in reviewDAO: ${e}`)
		}
	}

	static async addReview (movieId, user, review, date) {
		try {
			//se crea el documento que sera enviado a la base de datos
			const reviewDoc = {
				name: user.name,
				user_id: user._id,
				date: date,
				review: review,
				movie_id: ObjectId(movieId)//lo probe sin usar el metodo ObjectId, e igual funciona
			}
			//una vez creada la coneccion con la base de datos en injectDB, se usa la coneccion
			//reviews y de esta el metodo insertOne para añadir el documento previamente creado
			//a la base de datos
			let postResponse = await reviews.insertOne(reviewDoc, (err, data) => {
				console.log(data)
			})
			//let getResponse = await reviews.findOne(reviewDoc)
			//postResponse['Data sent'] = getResponse;
			return postResponse
		}
		catch(e) {
			console.error(`unable to post review: ${e}`)
			return { error: e }
		}
	}

	static async updateReview (reviewId, userId, review, date) {
		try {
			//la respuesta para actualizar la reseña, primero se mandan las propiedades
			//con las que se van a filtrar la busqueda de las reviews, lo segundo es para 
			//establecer que propiedades se van a reemplazar de la review filtrada, en este caso
			//se actualizara la review y la fecha de la misma.
			const updateResponse = await reviews.updateOne(
				{ user_id: userId, ObjectId: ObjectId(reviewId)},
				{ $set: { review: review, date: date }},
			)
			//se retorna la respuesta
			return updateResponse
		}
		catch(e) {
			console.error(`unable to update review: ${e}`)
			return { error: e }
		}
	}

	static async deleteReview (reviewId, userId) {
		try {
			//creamos la respuesta la cual va a borrar la reseña, volmevos a usar ObjectId, ya que
			//el id que le pasamos al metodo deleteOne tiene que ser un id de objeto de mongoDB y el 
			//metod ObjectId es quien lo va a convertir
			const deleteResponse = await reviews.deleteOne({
				_id: ObjectId(reviewId),
				user_id: userId,
			})
			console.log(deleteResponse)
			return deleteResponse
		}
		catch(e) {
			console.error(`unable to delete review: ${e}`)
			return { error: e }
		}
	}

	static async getReview (reviewId, userId, response) {//esto solo es para probar y aprender
		//ya que para get es mejor usar un url especifico y que el resultado de la peticion se muestre
		//en pantalla al usuario
		try {
			let r;
			await reviews.findOne({ _id: ObjectId(reviewId)}, (err, result) => {
				if (!err) {
					//console.log(result)
					r = result
				}
			})
			console.log(r, 'hola')
		} catch(e) {
			console.error(`unable to get review: ${e}`)
			return { error: e }
		}
	}
}