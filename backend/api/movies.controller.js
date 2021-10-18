import MoviesDAO from '../dao/moviesDAO.js'

export default class MoviesController {
	static async apiGetMovies(req, res, next) {//se define la funcion estatica para obtener las peliculas
		//definimos la peliculas por pagina ya sea del query de la request o 20 por defecto
		const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
		//hacemos lo mismo con el numero de pagina
		const page = req.query.page ? parseInt(req.query.page) : 0

		//definimos el objeto filtros, al inicio es en blanco ya que aun no se han definido los mismos
		let filters = {}
		if (req.query.rated) {//si el query rated existe
			filters.rated = req.query.rated //lo añadimos al objeto filters
		}
		else if (req.query.title) {//si el query title exite
			filters.title = req.query.title //lo añadimos al objeto filters
		}

		//luego llamamos a la funcion getMovies en MoviesDAO que implementamos en el archivo importado
		const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({ filters, page, moviesPerPage })

		// definimos la respuesta final al servidor
		let response = {
			movies: moviesList,
			page: page,
			filters: filters,
			entries_per_page: moviesPerPage,
			total_results: totalNumMovies,
		}
		//lo respondemos con un json
		res.json(response)
	}

	static async apiGetMovieById(req, res, next) {
		try {
			//obtenemos el id que se extrae del valor puesto entre los slashes /:id/
			let id = req.params.id || {}
			//llamamos al metodo correspondiente el cual devolvera la pelicula segun el id
			let movie = await MoviesDAO.getMovieById(id)
			if (!movie) {//si la pelicula no existe
				//muestra el mensaje de error
				res.status(400).json({ error: 'not found' })
				return //en este caso es necesario ponder el return, ya que si no se encuentra la
				//pelicula, se va a correr este codigo y el que le sigue, por eso se utiliza el return
				//para decirle que hasta aqui llege el codigo de la funcion
			}
			//muestra la pelicula
			res.json(movie)
		}
		catch(e) {
			console.log(`api, ${e}`)
			res.status(500).json({ error: e })
		}
	}

	static async apiGetRatings(req, res, next) {
		//en este caso es mas directo, solo se llama directamente al metodo
		try {
			//y este guarda el resultado
			let propertyTypes = await MoviesDAO.getRatings()
			//para luego mostrarlo al usuario
			res.json(propertyTypes)
		}
		catch(e) {
			console.log(`api, ${e}`)
			res.status(500).json({ error: e })
		}
	}
}