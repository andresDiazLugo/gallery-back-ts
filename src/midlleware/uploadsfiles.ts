import multer from 'multer'
// import app from '../app'
// import fs  from 'fs'
// const path = require('path');

const storage = multer.diskStorage({
    // destination: function(req,file,cb){
    //     cb(null, `${app.get("dirnameUpload")}/uploads`)
    // },
    destination:"build/uploads",
    
    filename: async function(req,file, cb){
        // console.log("este es un archivoooo",file)
          const a = file.mimetype.split("/")[1]
        //   console.log("archivos",file)
          const namefile = String(Math.random()*2).split(".").join("")+"."+a
          cb(null,namefile)
    }
})
 const upload = multer({storage})
export default upload
