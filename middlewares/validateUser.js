const data = require('../dataBase/users.json')
const { body, validationResult } = require('express-validator')
const  { compareSync } = require('bcryptjs')

const loginValidations = [
  body('email').notEmpty().withMessage('Debes ingresar un correo electrónico').bail()
  .isEmail().withMessage('Debes ingresar un formato de correo válido'),
  body('password').notEmpty().withMessage('Debes ingresar una contraseña'),
]

const errorsType = {
  404: 'Usuario no encontrado, por favor registrate.',
  401: 'Correo electrónico o contraseña incorrecta',
}

const validateUser = (req, res, next) => {  
  const { body } = req;
  const { email, password, rememberme } = req.body;

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.render('users/login', {   
      user: undefined,   
      errors: errors.mapped(),
      old: body,
      error: undefined
    })
  }

  const user = data.find(userData => userData.email === email);

  if(!user) {
    return res.render('users/login', {
      user: undefined,
      error: {
        msg: errorsType[404]
      }
    })
  }

  console.log({user});

  const isMatch = compareSync(password, user.password)

  if(!isMatch) {
    return res.render('users/login', {
      user: undefined,
      error: {
        msg: errorsType[401]
      }
    })
  
  }
      
  req.session.user = user;
  
  if(rememberme) {
    res.cookie('rememberme', user.email, { maxAge: 1000 * 60 * 60 * 24 * 1 })  
  }

  next();

}

module.exports = {
  loginValidations,
  validateUser
};