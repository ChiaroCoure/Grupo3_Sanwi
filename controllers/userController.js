const fs = require('fs');
const path = require('path');
const { hashSync } = require('bcryptjs');
const usersFilePath = path.join(__dirname, '../dataBase/users.json');
const users = require('../dataBase/users.json');

const db = require('../dataBase/models')
const sequelize = db.sequelize;

const userController={
  login: (req, res) => {
    res.render('users/login', { error: undefined });
  },
  perfil:(req, res) =>{
      res.render('users/perfil')
  },
  logout:(req, res) => {  
     req.session.user=undefined
     res.redirect('/')
  }, 
  register: (req, res) => {
    res.render('users/register', { error: undefined, errores: undefined });
  },
  store: (req, res) => {
    console.log('---------', req.user)
    db.User.create(req.user)
    .then((results)=>{
      const correo = users.find(value=>value.email === results.email);

      const usuario = users.find(value=>value.username === results.username);

      if (correo || usuario) {
        res.render('users/register', { 
          errores: 'El nombre de usuario o email ya se encuentran registrados',
          error: undefined,
          old: req.body,
        })
      } else { 
        res.redirect('/users/login');
      } 
      
    })   

  }
}
module.exports = userController;