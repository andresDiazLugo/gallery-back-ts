import {Router} from 'express'
import {postSignUp,postsignIn,postUserImg,getUser} from '../controllers/user.controllers'
import {tokenValidation} from '../midlleware/authUser'
import upload from '../midlleware/uploadsfiles'

const routes = Router();

routes.post("/signup",postSignUp)
routes.post("/sigin",postsignIn)
routes.post("/user/upload",tokenValidation,upload.single('avatar'),postUserImg)
routes.get("/user/:id",tokenValidation,getUser)

export default routes