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
  productEdit: (req, res) => {
    const { id } = req.params;

    const productSearch = products.find((product) => product.id === id);

    res.render('products/product-edit-form', { product: productSearch });
  
  },
  productUpdate: (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const indexProduct = products.findIndex((product) => product.id === id);

    products[indexProduct] = {
      id: products[indexProduct].id,
      ...body
    }

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    res.render('products');
  
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