const express=require('express');
const router=express.Router();
const multer = require('multer');
const path = require('path');

//*********MULTER */
const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        const pathImage= path.join(__dirname, '..','public','img','users');
        cb(null, pathImage);
    },
    filename:(req, file, cb)=>{
        console.log(file)
        const fileNewName='perfile-'+ Date.now() + path.extname(file.originalname);
        cb(null, fileNewName);
    }
})
const upload=multer({storage})

//coontrollers
const userController= require('../controllers/userController')

//middlewares
const validateUser = require('../middlewares/validateUser');
const {arrRegister, validateRegister}=require('../middlewares/validateRegister')

router.get('/login', userController.login)
router.post('/login', validateUser, userController.render)

router.get('/register', userController.register)
router.post('/register', arrRegister, validateRegister, upload.single('image'), userController.store);  

module.exports=router;