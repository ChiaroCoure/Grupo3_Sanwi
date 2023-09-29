const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../dataBase/users.json');

const users = require('../dataBase/users.json');

const userController={
  formLogin: (req, res) => {
    const user = req.session.user;
    res.render('users/login', { user, error: undefined });
  },
  login:(req, res) => {    
    res.redirect('/');
  },
  register: (req, res) => {
    const user = req.session.user;

    res.render('users/register', { user });
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