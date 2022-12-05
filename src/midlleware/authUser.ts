import {Request,Response,NextFunction} from 'express'
import jwt from 'jsonwebtoken'
import {config} from '../config/config'
import {Ipayload} from '../interface/interfaces'
export const tokenValidation = (req:Request,res:Response, next:NextFunction)=>{
    const token = req.header('auth-token');
    // console.log("ver token",token)
    if(!token) return res.status(401).json('Acceso denegado')
    try {
        const payload:Ipayload = jwt.verify(token,config.SECRET) as Ipayload
        req.userId = payload.id
    } catch (error) {
        return res.status(404).json({
            msg:'Acceso denegado'
        })
    }
    next()
}


