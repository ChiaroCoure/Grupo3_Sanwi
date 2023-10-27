const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const userController= require('../controllers/userController');

const { loginValidations, validateUser } = require('../middlewares/validateUser');
const { arrRegister, validateRegister }=require('../middlewares/validateRegister');
const { nonUserRoute } = require('../middlewares/userRoute');

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

router.get('/login', nonUserRoute, userController.login);
router.post('/login', loginValidations, validateUser, userController.perfile)

router.get('/perfile', userController.perfile)
router.post('/logout', userController.logout)

router.get('/register', userController.register)
router.post('/register', upload.single('image'), arrRegister, validateRegister, userController.store);  

router.get('/perfile-edit/:id', userController.edit)
router.post('/perfile-edit/:id',userController.update)

module.exports=router;