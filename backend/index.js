import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'

async function main() {

	dotenv.config()

	const client = new mongodb.MongoClient(
		process.env.MOVIEREVIEWS_DB_URI
	)
	const port = process.env.PORT || 8000

	try {
		//Intentando conectar al cluster de MongoDB
		await client.connect()
		app.listen(port, () => {
			console.log('sever is running on port:'+port);
		})
	} catch (e) {
		console.error(e);
		process.exit(1)
	}
}

main().catch(console.error);