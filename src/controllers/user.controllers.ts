import {Request,Response} from 'express'
import {serviceSignUp,serviceSigIn} from '../services/user.services'
import {verifyPropsUser} from '../ServicesComprobation/userpropVerify'
import {User} from '../DataBase/connection'
import app from '../app'
import fsPromise from 'fs/promises'
import cloudinary from 'cloudinary'
import fs from 'fs'

export const postSignUp = async(req:Request, res:Response)=>{
    // console.log("este es el objeto",req.body)
    try {
        verifyPropsUser(req.body)
        const responseService = await serviceSignUp(req)
        return res.status(200).json(responseService)
    } catch (error:any) {
        console.log("error provisto en postSignUp revisar",error)
        return res.status(404).json(error.message)
    }
}

export const postsignIn = async (req:Request, res:Response)=>{
    try {
        const responseService = await serviceSigIn(req)
        res.status(200).json(responseService)
    } catch (error) {
        console.log("error provisto en postSignUp revisar",error)
        return res.status(404).json("surgio un error al querer iniciar sesion")
    }
}
export const postUserImg = async(req:Request, res:Response)=>{
    // const {userId} = req
    // console.log("id del usuario",req.ususerId)
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      };
try {
    const archivos = await fsPromise.readdir(app.get('dirnameUpload')+"/uploads")
    // console.log("estos son los archivos",archivos)
    // const result:cloudinary.UploadApiResponse[] = await Promise.all(archivos.map(files=> cloudinary.v2.uploader.upload(`${app.get("dirnameUpload")}/uploads/${files}`,options)))
    const result:cloudinary.UploadApiResponse = await cloudinary.v2.uploader.upload(`${app.get("dirnameUpload")}/uploads/${archivos[0]}`,options)
    // console.log(archivos)
//    const updateInfoUser = await User.create({
//         title: title,
//         urlImg: e.url,
//         idCloudinary: e.public_id,
//         UserId:user
//      })
console.log("este es el id",req.userId)
  const s =  await User.update({ profileUrl:result.url},{
    where:{
        id:req.userId
    }
    })
    console.log("este el usuario modificado",s)
     await Promise.all(archivos.map(file=>fs.unlink(app.get('dirnameUpload')+"/uploads/"+file,(e)=>console.log(e))))

     return  res.status(200).json({
        msg: "Su foto de perfil se cambio con exito"
      })
} catch (error) {
    console.log("este es el error", error)
    return res.status(400).json({
          msg:`surgio un error al momento de cambiar su foto de perfil: ${error}`
        })
}
}


export const getUser = async (req:Request, res:Response)=>{
    try {
        const {id} = req.params
        const searchUser = await User.findOne({
            where:{
                id
            }
        })
        res.status(200).json(searchUser)
    } catch (error:any) {
        res.status(404).json({
            msg:error.meesage
        })
    }
}