import express,{Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {config} from './config/config'
import userRoutes from './routes/user.routes'
import galleryRoutes from './routes/gallery.routes'
const app:Application = express()



//configuraciones de server
app.set("saludo","hola andres")
app.set("PORT",4000 || config.PORT)
app.set("dirnameUpload",__dirname)

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use("/api/users", userRoutes)
app.use("/api/gallery", galleryRoutes)


export default app