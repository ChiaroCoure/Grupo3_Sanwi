const data= require('../dataBase/users.json');//pareseado si uso el require

const validateUser=(req, res, next)=>{
    //validar lo que se trae por quary
    const user = req.query.user;
    const searchUser=data.find(userData => userData.username===user);
    if(searchUser){
        next()
    }else{
        res.send('Usuario no registrado')
    }    
}

module.exports =validateUser;