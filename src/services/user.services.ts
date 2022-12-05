import {Request} from 'express'
import {User} from '../DataBase/connection'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {responseServer,Iuser} from '../interface/interfaces'
import {SearchOrCreate} from '../types/types'
import {config} from '../config/config'

export const serviceSignUp = async(req:Request):Promise<responseServer>=>{
        const password:string = await bcrypt.hash(req.body.password,10);
        req.body.password = password;
        const searchUsername:any = await User.findOne({
            where:{
                username:req.body.username
            }
        })
        if(searchUsername)return{
            msg: `El username ${searchUsername.username} ya existe, intente con otro nombre`
        }
        const searchUserOrCreate:SearchOrCreate = await User.findOrCreate({
            where:{
                email: req.body.email,
            },
            defaults:req.body
        })
        if(!searchUserOrCreate[1])return {
            msg: "Este cuenta ya existe intente iniciar sesion"
        }
        return {
            msg: "Usuario creado con exito"
        }
}

export const serviceSigIn = async(req:Request):Promise<responseServer>=>{
    const searchUser:Iuser | null=  await User.findOne({
        where: {email:req.body.email}
    }) as Iuser | null
    if(searchUser){
        const compare:boolean = await bcrypt.compare(req.body.password,searchUser.password)
        if(!compare)return{msg:"correo o contraseña incorrecto"}
        const token:string =jwt.sign({id:searchUser.id},config.SECRET,{
           expiresIn: 60 * 60 * 24// 1 dia 
        })
        return{
            msg:"Sesion iniciada",
            token,
            instance:String(searchUser.id)
        }
    }    
    return {
        msg: "no tienes una cuenta asociada a nuestros servicios intente crear una cuenta nueva"
    }
}