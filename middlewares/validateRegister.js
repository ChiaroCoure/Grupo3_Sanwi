const {body, validationResult} = require('express-validator');

const arrRegister=[
    body('username').notEmpty().withMessage('Debe ingresar un nombre de usuario'),
    body('email').notEmpty().withMessage('Debe ingresar tu email').bail().isEmail().withMessage('Debes ingresar un formato de email válido'),
    body('password').notEmpty().withMessage('Debe ingresar tu password')
    /* .isLength({min:5, max:8}).withMessage('Debe ingresar una cantidad min de 5 y un max de 8 caracteres') */
    
];

const validateRegister=(req, res, next)=>{
    const errors=validationResult(req);
    console.log(errors)
    if(errors.isEmpty()===true){
        next()
    }else{
        res.render('users/register',{
            errors:errors.mapped(),
            old: req.body            
        })
    }
};

module.exports={arrRegister, validateRegister}