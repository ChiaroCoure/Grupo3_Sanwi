const products=require('../dataBase/products')

const mainController = {
  home: (req, res) => {
    res.render('home');
  },
  login: (req, res) => {
    res.render('users/login');
  },
  register: (req, res) => {
    res.render('users/register');
  },
  billing: (req, res) => {
    res.render('billing');
  },
  productDetail: (req, res) => {
    const productSearch = products.find((product)=> product.id === req.params.id)
    res.render('products/product-detail',{data: products, search:productSearch});
  },
  productsCart: (req, res) => {
    res.render('products/products-cart');
  },
  redirect: (req, res) => {
    res.redirect('home');
  }
}

module.exports = { mainController }

