const data = require('../dataBase/users.json');

function userLogged (req, res, next) {
      
  const email = req.cookies.rememberme;
  
  const user = data.find(userData => userData.email === email);
  
  if(req.cookies.rememberme && !req.session.user){
    req.session.user = user;
    res.locals.user = user;
  }

  if(req.session.user) {
    res.locals.user = req.session.user
  }

  next();
   
}

module.exports = userLogged;