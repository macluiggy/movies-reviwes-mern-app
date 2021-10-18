import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId

let movies

export default class MoviesDAO {
	static async injectDB(conn) {
		if (movies) {
			return
		}
		try {
			movies = await conn.db(process.env.MOVIEREVIEWS_NS)
				.collection('movies')
		}
		catch(e) {
			console.error(`unable to connect in MoviesDAO: ${e}`)
		}
	}

	static async getMovies({
		filters = null,// al inicio no hay filtro
		page = 0,//la pagina inicial es 0
		moviesPerPage = 20,//la cantidad de peliculas que se van a mostrar por pagina es 20
	} = {}) {
		let query //definimos el query
		if (filters) {//si se establece un filtro
			if ('title' in filters) {//si el filtro es "title"
				query = { $text: { $search: filters['title'] }}//establece el query para ese termino
			} else if ("rated" in filters) {//si el filtro es 'rated'
				query = { "rated": { $eq: filters['rated'] } }//establece a query para ese termino
			}
		}

		//query = { "rated": filters['rated']}; //definimos uno de ejemplo

		let cursor //definimos el cursor
		try {//intentamos
			cursor = await movies//se espera a objener la colection antes creada en injectDB
						.find(query)//encuntra la/las peliculas que coincidan el el query
						.limit(moviesPerPage)//limita el resultado
						.skip(moviesPerPage * page)//omite el numero de peliculas que se encuentra
												   //en el argumento y dado que ya se limito solo se
												   //mostraran moviesPerPage peliculas
												   //si se usa este con limit, este se aplicara primero
												   //el limite se aplicara solo a los documentos que
												   //aparecen despues de la omision
            //console.log(cursor)
			const moviesList = await cursor.toArray()//crea un array con el filtro que se le aplico
												     //al cursor
			const totalNumMovies = await movies.countDocuments(query)//obten el numero total de peliculas
																	 //contando el numero de documentos
																	 //en el query que satisfaga la 
																	 //condicion
			return { moviesList, totalNumMovies }//retorna la lista de peliculas y el numero total de
												 //peliculas encontradas
		}
		catch(e) {
			console.error(`Unable to issue find command, ${e}`)
			return { moviesList: [], totalNumMovies: 0 }
		}
	}

	static async getRatings() {
		let ratings = []
		try {
			//obten todos los valores de la propiedad 'rated' de la coleccion movies y asignalos al array
			//ratings
			ratings = await movies.distinct("rated");
			return ratings
		}
		catch(e) {
			console.log(`unable to get ratings, ${e}`)
			return ratings
		}
	}

	static async getMovieById(id) {
		try {
			return await movies.aggregate([
				{
					$match: {
						_id: new ObjectId(id),
					}
				},
				{ $lookup: //aqui va a buscar las peliculas de movies de las cuales tengan un review con el id = _id el cual proviene de la coleccion 'reviews'
					{
						from: 'reviews',//de la coleccion 'reviews'
						localField: '_id',//de valor del _id que se encontro en $match
						foreignField: 'movie_id',//busca las peliculas que encajen con el _id de localFiel, y devuelve las peliculas con sus respectivos reviews
						as: 'reviews',//devuelvelos como un array
					}
				}
			]).next()//ve hacia el siguiente documento de la coleccion que matchee
		}
		catch(e) {
			console.error(`something went wrong in getMovieById: ${e}`)
			throw e
		}
	}
}