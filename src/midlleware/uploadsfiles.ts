import app from '../app'
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, `${app.get("dirnameUpload")}/uploads`)
    },
    
    filename: async function(req,file, cb){
        console.log("este es un archivoooo",file)
          // const name = file.mimetype.split("/")[1]
          const name = file.originalname

        //   console.log("archivos",file)
          // const namefile = String(Math.random()*2).split(".").join("")+"."+a
          cb(null,name)
    }
})
 const upload = multer({storage})
export default upload
