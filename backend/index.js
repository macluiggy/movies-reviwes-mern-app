import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import MoviesDAO from './dao/moviesDAO.js'

async function main() {

	dotenv.config()

	const client = new mongodb.MongoClient(
		process.env.MOVIEREVIEWS_DB_URI,
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	const port = process.env.PORT || 8000

	try {
		//Intentando conectar al cluster de MongoDB
		await client.connect()
		//justo despues de conectar la base de datos llamamos a injectDB para obtener nuestra
		//referancia inicial a la movies collection
		await MoviesDAO.injectDB(client)
		app.listen(port, () => {
			console.log('sever is running on port:'+port);
		})
	} catch (e) {
		console.error(e);
		process.exit(1)
	}
}

main().catch(console.error);