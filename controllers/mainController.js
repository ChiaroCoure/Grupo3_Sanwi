const cart = require('../dataBase/cart');

const mainController = {
  home: (req, res) => {
    res.render('home');
  },
  billing: (req, res) => {
    res.render('billing');
  },
  cart: (req, res) => {
    res.render('products/products-cart', { cart });
  }
}

module.exports =  mainController 
