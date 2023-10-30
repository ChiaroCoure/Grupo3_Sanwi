const {body, validationResult} = require('express-validator');
const { hashSync, compareSync}= require('bcryptjs');

const arrRegister=[
    body('username').notEmpty().withMessage('Debe ingresar un nombre de usuario'),
    body('email').notEmpty().withMessage('Debe ingresar tu email').bail().isEmail().withMessage('Debes ingresar un formato de email válido. Ejemplo: nombre@gmail.com'),
    body('password').notEmpty().withMessage('Debe ingresar tu contraseña').isLength({min:5, max:8}).withMessage('Debe ingresar una cantidad min de 5 y un max de 8 caracteres'), 
    body('passwordRepeat').notEmpty().withMessage('Debes repetir tu contraseña')
];

const validateRegister=(req, res, next)=>{
    const user = req.session.user;
    const errors=validationResult(req);

    try{
        if(errors.isEmpty()){
            const hashing= hashSync(req.body.password, 10);

            if (compareSync(req.body.passwordRepeat, hashing)){
                req.user={
                    ...req.body,
                    password: hashing,
                    image: req.file?.filename || "user-default.png"
                }
                next()
            }else{ 
                res.render('users/register',{                  
                    errors: errors.mapped(),
                    error:'Las contraseñas no soy iguales',                 
                    errores:undefined,
                    old: req.body,
                    user
                })
            }
        }else{
            throw errors        
        }

    }catch(err){
        res.render('users/register',{
            error: undefined,
            errores:undefined,
            errors: errors.mapped(),
            old: req.body,
            user            
        })
    }
};

module.exports={arrRegister, validateRegister}