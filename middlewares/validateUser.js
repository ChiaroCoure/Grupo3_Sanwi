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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('users/login', {   
      errors: errors.mapped(),
      old: body
    })
  }

  const user = data.find(userData => userData.email === email);

  if(!user) {
    res.locals.loginError = { msg: errorsType[404] };
    return res.render('users/login')
  }

  const isMatch = compareSync(password, user.password)

  if(!isMatch) {
    res.locals.loginError = { msg: errorsType[401] };
    return res.render('users/login')
  }
      
  req.session.user = user;
  res.locals.user = user;
  
  if(rememberme) {
    res.cookie('rememberme', user.email, { maxAge: 1000 * 60 * 60 * 24 * 1 })  
  }

  next();

}

module.exports = {
  loginValidations,
  validateUser
};