const fs = require('fs');
const path = require('path');
const products = require("../dataBase/products.json");

const productsFilePath = path.join(__dirname, '..', 'dataBase', 'products.json');
const db = require('../dataBase/models')
const { Product, Category, User } = db;
const sequelize = db.sequelize;

const productsController = {
  productDetail: (req, res) => {
    const { id } = req.params;

    Product.findByPk(id)
      .then((product) => {
        if (product) {
          res.render('products/product-detail', { product });
        } else {
          res.status(404).send('Producto no encontrado');
        }

  deleteProduct: (req, res) => {    
    const { id } = req.params;

    const filteredProducts = products.filter((product) => product.id !== id);

    fs.writeFileSync(productsFilePath, JSON.stringify(filteredProducts, null, 2));

    res.redirect('/products');

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

    res.redirect('/products');
  
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
  },
  createProduct: (req, res) => {
    const newProduct = {
      id:`${Date.now()}`,
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      price: req.body.price,
      img: req.file?.filename
    };
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products));
    res.redirect('/');
  },
  searchProduct: (req, res) => {
    const { search } = req.query

    const productSearch = products.filter((product) => product.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
    
    res.render('products/results', {
      products: productSearch
    })
  }
}

module.exports = { productsController }