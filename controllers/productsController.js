const fs = require('fs');
const path = require('path');
const products = require("../dataBase/products.json");

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

    const productsWithDiscount = parsedProducts.filter((product) => product.discount > 0)

    res.render('products/product-list', {
      products: parsedProducts,
      offers: productsWithDiscount  
    })

  },
  productEdit: (req, res) => {
    const { id } = req.params;

    const productSearch = products.find((product) => product.id === id);

    res.render('products/product-edit-form', { product: productSearch });
  
  },
  productUpdate: (req, res) => {
    const { id } = req.params;
    const { body: { name, price, description} } = req;

    const indexProduct = products.findIndex((product) => product.id === id);

    products[indexProduct] = {
      ...products[indexProduct],
      name,
      price,
      description    
    }

    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    const parsedProducts = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    const productsWithDiscount = parsedProducts.filter((product) => product.discount > 0)

    res.render('products/product-list', {
      products: parsedProducts,
      offers: productsWithDiscount  
    })
  
  },
  productList: (req, res) => {

    const productsWithDiscount = products.filter((product) => product.discount > 0)

    res.render('products/product-list', {
      products,
      offers : productsWithDiscount
    });
  },
  redirect: (req, res) => {
    res.redirect('/');
  },
  loadSandwich: (req, res) => {
    res.render('products/product-create-form');
  }
}

module.exports = { productsController }