import mongodb from 'mongodb'
//luego de importar mongodb, creamos una variable ObjectId, para luego convertir un id string
//en un objeto MongoDB id despues
const ObjectId = mongodb.ObjectId

//definimos las revies
let reviews

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
				movie_id: ObjectId(movieId)
			}
			//una vez creada la coneccion con la base de datos en injectDB, se usa la coneccion
			//reviews y de esta el metodo insertOne para añadir el documento previamente creado
			//a la base de datos
			return await reviews.insertOne(reviewDoc)
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
			//se actualizara la review y la fecha de la misma
			const updateResponse = await reviews.updateOne(
				{ user_id: userId, ObjectId: ObjectId(reviewId)},
				{ $set: { review: review, date: date }}
			)
			//se retorna la respuesta
			return updateResponse
		}
		catch(e) {
			console.error(`unable to update review: ${e}`)
			return { error: e }
		}
	}
}