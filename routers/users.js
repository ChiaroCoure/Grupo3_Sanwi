const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const userController= require('../controllers/userController');

const { loginValidations, validateUser } = require('../middlewares/validateUser');
const { arrRegister, validateRegister }=require('../middlewares/validateRegister');

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

const upload=multer({ storage })

router.get('/login', userController.formLogin)
router.post('/login', loginValidations, validateUser, userController.login)

router.get('/register', userController.register)
router.post('/register', upload.single('image'), userController.store);  

module.exports=router;