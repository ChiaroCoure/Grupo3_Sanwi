const data = require('../dataBase/models')
const { body, validationResult, Result } = require('express-validator')
const  { compareSync } = require('bcryptjs')

const sequelize = data.sequelize;
const {Op}=require("sequelize");

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
  data.User.findAll({
    where:{
      email:{
          [Op.eq]:req.body.email
      }
  }
  })
  .then(results =>{
  const { body } = req;
  const { password, rememberme } = req.body;

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.render('users/login', {   
      errors: errors.mapped(),
      old: body
    })
  }
 
  if(results.length === 0) {
    res.locals.loginError = { msg: errorsType[404] };
    return res.render('users/login')
  }else{
  const user = results[0]?.dataValues;
  const isMatch = compareSync(password, user?.password)
  
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
  }) 
  

}

module.exports = {
  loginValidations,
  validateUser
};