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
  perfile:(req, res) =>{
      res.render('users/perfile')
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
    db.User.findAll()
    .then((results)=>{
      console.log('---------datos----------', results)
      const correo = results.find(value=>value.dataValues.email === req.user.email);
      const usuario = results.find(value=>value.dataValues.username === req.user.username);

      console.log('---------------correoyusuairo', correo, usuario);
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
    console.log('valores-------',user)
        res.render('users/perfile-edit', {user})
    //res.render('users/perfile-edit')
  },
  update: async function (req,res) {
    // TODO
    await db.User.update(req.body, {where: {id:req.params.id}})
    res.redirect('/users/perfile')
},
}
module.exports = userController;