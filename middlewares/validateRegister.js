const {body, validationResult} = require('express-validator');
const { hashSync, compareSync}= require('bcryptjs');
const users = require('../dataBase/users.json');
const arrRegister=[
    body('username').notEmpty().withMessage('Debe ingresar un nombre de usuario'),
    body('email').notEmpty().withMessage('Debe ingresar tu email').bail().isEmail().withMessage('Debes ingresar un formato de email válido. Ejemlo: nombre@gmail.com'),
    body('password').notEmpty().withMessage('Debe ingresar tu password').isLength({min:5, max:8}).withMessage('Debe ingresar una cantidad min de 5 y un max de 8 caracteres'), 
    body('passwordRepeat').notEmpty().withMessage('Debe repetir tu password')
];

const validateRegister=(req, res, next)=>{
    const errors=validationResult(req);
    console.log('errores--------------',errors.mapped())

    try{
        if(errors.isEmpty()){
            const hashing= hashSync(req.body.password, 10);

            if (compareSync(req.body.passwordRepeat, hashing)){
                next()
            }else{
                res.render('users/register',{
                    errors: errors.mapped(),
                    error:'Las contraseñas no soy iguales',                 
                    errores:undefined,
                    old: req.body        
                })
            }
        }else{
            throw errors        
        }

    }catch(err){
        res.render('users/register',{
            errors: errors.mapped(),
            old: req.body            
        })
    }
};

module.exports={arrRegister, validateRegister}