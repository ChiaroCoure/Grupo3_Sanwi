const data = require('../dataBase/users.json')

function rememberMe(req, res, next) {
  const email = req.cookies.rememberme;
  
  const user = data.find(userData => userData.email === email);
  
  if(req.cookies.rememberme && !req.session.user){
    req.session.user = user;
  }

  next();
}

module.exports = rememberMe;