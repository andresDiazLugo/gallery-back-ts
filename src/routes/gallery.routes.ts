import {Router} from 'express';
import {postUploadFile, getAllImages,deleteImage} from '../controllers/gallery.controllers'
import upload from '../midlleware/uploadsfiles'
import {tokenValidation} from '../midlleware/authUser'
const routes = Router();


routes.post("/upload",tokenValidation,upload.array('avatar',10),postUploadFile)
routes.get("/allImages",tokenValidation,getAllImages)
routes.delete("/allImages/:idCloud",deleteImage)
export default routes