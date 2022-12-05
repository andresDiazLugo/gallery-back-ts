import {sequelize} from './DataBase/connection'
import app from './app'
import cloudinary from 'cloudinary'

//mounted server

app.listen(app.get("PORT"),async()=>{
   
cloudinary.v2.config({
    secure: true
})   
    console.log("server runing in the port ",app.get("PORT"))
   sequelize.sync({force: true})
})
