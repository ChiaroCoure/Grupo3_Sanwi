const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../dataBase/users.json');
//leer el archivo
/* const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); */
const users = require('../dataBase/users.json');

const userController={
  login: (req, res) => {
    res.render('users/login');    
  },
  render:(req,res)=>{
    res.send('Bienvenido!');
  },
  register: (req, res) => {
    res.render('users/register');
  },
  store:(req, res)=>{
    //multer
		console.log('imagen del form',req.body);

        const newUser= {
          id:`${Date.now()}`,
          username:req.body.username,
          email:req.body.email,
          password:req.body.password,
          image: req.file?.filename
        }
        users.push(newUser);
        
        fs.writeFileSync(usersFilePath, JSON.stringify(users));
        /* res.json(users) */
        res.redirect('/');
    
    }
}
module.exports= userController;