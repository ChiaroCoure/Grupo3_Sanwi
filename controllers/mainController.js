const cart = require('../dataBase/cart');

const mainController = {
  home: (req, res) => {
    const user = req.session.user;
    res.render('home', { user });
  },
  billing: (req, res) => {
    const user = req.session.user;
    res.render('billing', { user });
  },
  cart: (req, res) => {
    const user = req.session.user;
    res.render('products/products-cart', { cart, user });
  }
}

module.exports =  mainController 
