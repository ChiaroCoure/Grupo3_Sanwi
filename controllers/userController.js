const fs = require('fs');
const path = require('path');
const { hashSync } = require('bcryptjs');
const usersFilePath = path.join(__dirname, '../dataBase/users.json');

const db = require('../dataBase/models')
const sequelize = db.sequelize;

const userController={
  login: (req, res) => {
    res.render('users/login', { error: undefined });
  },
  profile:(req, res) =>{
      res.render('users/profile')
  },
  logout:(req, res) => {  
     req.session.user=undefined
     res.redirect('/')
  }, 
  register: (req, res) => {
    res.render('users/register', { error: undefined, errores: undefined });
  },
  store: (req, res) => {
    db.User.findAll()
    .then((results)=>{
      const correo = results.find(value=>value.dataValues.email === req.user.email);
      const usuario = results.find(value=>value.dataValues.username === req.user.username);
      if (correo || usuario) {
        res.render('users/register', { 
          errores: 'El nombre de usuario o email ya se encuentran registrados',
          error: undefined,
          old: req.body,
        })
      } else { 
        db.User.create(req.user)
        res.redirect('/users/login');
      } 
    })   

  },
  edit: async function(req, res) {
    const user=await db.User.findByPk(req.params.id)
    const user=await db.User.findByPk(req.params.id || res.locals.user.id)
        res.render('users/profile-edit', {user})
  },
  update: async function (req,res) {
    await db.User.update(req.body, {where: {id:req.params.id}})
    res.redirect('/users/profile')
},
}
module.exports = userController;