import {Request,Response} from 'express'
import{serviceUploadFile,getImagenes} from '../services/gallery.services'
// import {responseServer} from '../interface/interfaces'
import {Gallery} from '../DataBase/connection'
import cloudinary from 'cloudinary'
export const postUploadFile = async(req:Request,res:Response)=>{
console.log(req.body)
    try {
        const response =await serviceUploadFile(req.body.title,req.userId)
        res.status(200).json(response)
    } catch (error:any) {
        res.status(404).json({
            msg:error.message
        })
    }
}

export const getAllImages = async(req:Request, res:Response)=>{
    try {
        const response = await getImagenes(req.userId)
        res.status(200).json(response)
    } catch (error:any) {
        res.status(400).json({
            msg:error.message
        })
    }
}


export const deleteImage = async(req:Request,res:Response)=>{
    console.log("parametro",req.params)
    try {
        const {idCloud} =req.params    
        console.log("id de imagen", idCloud)
        const response = Gallery.destroy({
            where:{
               idCloudinary:idCloud 
            }
        })
        const {result} = await  cloudinary.v2.uploader.destroy(idCloud)
        console.log("resultado de cloudinary",result)
        if(!response && result !== "ok"){
            res.status(201).json({
                msg: "no se encuentra el registro que desea eliminar"
            })
        }
        res.status(200).json({
            msg: "el registro se elimino con exito"
        })
    } catch (error) {
        res.status(404).json({
            msg:"surgio un error al eliminar"
        })
    }
}
