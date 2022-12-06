import {sequelize} from './DataBase/connection'
import app from './app'
import cloudinary from 'cloudinary'
import path from 'path'
import fs from 'fs'

//mounted server

app.listen(app.get("PORT"),async()=>{
        fs.mkdir(path.join(__dirname, 'uploads'),()=>{
            console.log('Directory created successfully!')
        })   
    
cloudinary.v2.config({
    secure: true
})   
    console.log("server runing in the port ",app.get("PORT"))
   sequelize.sync({force: true})
})
