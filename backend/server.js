import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/v1/movies", movies)
//el asterisco sive para cuando alguien intente ir a una url que no existe, para enviar un mensaje
//de error via json
app.use('*', (req,res)=>{
res.status(404).json({error: "not found"})
})
export default app