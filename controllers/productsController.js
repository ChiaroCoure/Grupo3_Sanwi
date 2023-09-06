const fs = require('fs');
const path = require('path');
const { cart } = require("../dataBase/cart");
const products = require("../dataBase/products");

const productsFilePath = path.join(__dirname, '..', 'dataBase', 'products.json');

const productsController = {
  productDetail: (req, res) => {
    const { id } = req.params;

    const productSearch = products.find((product) => product.id === id);

    res.render('products/product-detail', { products, productSearch });
  },
  deleteProduct: (req, res) => {
    const { id } = req.params;

    const filteredProducts = products.filter((product) => product.id !== id);

    fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, 2));

    const parsedProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    res.render('products', { products: parsedProducts })

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