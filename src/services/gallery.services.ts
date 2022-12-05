// import multer from 'multer'
import app from '../app'
import fs from 'fs'
import cloudinary from 'cloudinary'
import {responseServer} from '../interface/interfaces'
import {Gallery} from '../DataBase/connection'
import fsPromise from 'node:fs/promises'

export const serviceUploadFile = async(title:string | null,user:number):Promise<responseServer>=>{

    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
try {
    const archivos = await fsPromise.readdir(app.get('dirnameUpload')+"/uploads")
    const result:cloudinary.UploadApiResponse[] = await Promise.all(archivos.map(files=> cloudinary.v2.uploader.upload(`${app.get("dirnameUpload")}/uploads/${files}`,options)))
   const s = await Promise.all(result.map(e=>Gallery.create({
        title: title,
        urlImg: e.url,
        idCloudinary: e.public_id,
        UserId:user
     })))
     await Promise.all(archivos.map(file=>fs.unlink(app.get('dirnameUpload')+"/uploads/"+file,(e)=>console.log(e))))
     console.log(s)
     return {
        msg: "los datos fueron cargados con exito"
      }
} catch (error) {
    return{
          msg:`surgio un error al momento de cargar los datos: ${error}`
        }
}

}

export const getImagenes=async(userid:number)=>{
        const responseDataBase = await Gallery.findAll({
            attributes: ['id', 'title','urlImg','idCloudinary','createdAt'],
            where:{
                UserId:userid
            }
        }
        ) 
        if(responseDataBase.length > 0){
            return responseDataBase
        }
        return{
            msg: "no hay registros existentes"
        }
}