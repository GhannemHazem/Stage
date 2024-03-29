const express =require('express')
const multer =require('multer')
const path =require('path')
const router = express.Router()

const storage=multer.diskStorage({
    destination(req,file,cb){
        cb(null,'Upload/')
    },
    filename(req,file,cb){
        
        cb(null,`${file.fieldname}-${Date.now()}${path
            .extname(file.originalname)}`)
    }
})

function checkFileType (file,cb){
    const filetypes = /jpeg|jpg|png/
    const extname= filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)
    if(extname && mimetype){
        return cb(null,true)
    }else{
        cb('Image Only!')
    }
}
const upload = multer({ storage: storage,
    fileFilter:function(req,file,cb){
        checkFileType(file,cb)
    }
})

router.post('/',upload.single('image'),(req,res)=>{
    res.send(`/${req.file.path}`)
})


module.exports=router
