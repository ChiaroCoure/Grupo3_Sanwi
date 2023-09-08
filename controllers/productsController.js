const { cart } = require("../dataBase/cart");
const products = require("../dataBase/products");

const productsController = {
  productDetail: (req, res) => {
    const productSearch = products.find((product)=> product.id === req.params.id)
    res.render('products/product-detail',{data: products, search:productSearch});
  },
  productList: (req, res) => {
    const product = products;
    const discounProduct = products.filter((product) => product.discount>0)
    res.render('products/product-list', {
      productos : product,
      ofertas : discounProduct
    });
  },
  productsCart: (req, res) => {
    res.render('products/products-cart', { cart });
  },
  redirect: (req, res) => {
    res.redirect('/');
  },
  loadSandwich: (req, res) => {
    res.render('load-sandwich');
  }
}

module.exports = { productsController }