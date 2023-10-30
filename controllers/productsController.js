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

    Product.findAll({

    })
      .then((products) => {
        res.render('products/results', {
          products: products
        });
      })

    Product.findByPk(id)
      .then((product) => {
        if (product) {
          res.render('products/product-detail', { productSearch: product });
        } else {
          res.status(404).send('Producto no encontrado');
        }})
  },
  
  deleteProduct: (req, res) => {    
    const { id } = req.params;

    Product.findByPk(id)
      .then((product) => {
        if (product) {
          return product.destroy();
        } else {
          res.status(404).send('Producto no encontrado');
        }
      })
      .then(() => {
        res.redirect('/products');
      })

  },

  productEdit: (req, res) => {
    const { id } = req.params;

    Product.findByPk(id)
      .then((product) => {
        if (product) {
          res.render('products/product-edit-form', { product });
        } else {
          // Manejar el caso en que no se encuentra el producto
          res.redirect('/products');
        }
      })
  
  },

  productUpdate: (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    Product.update(
      { name, price, description },
      {
        where: { id },
      }
    )
      .then(() => {
        res.redirect('/products');
      });
  },
  
  productList: (req, res) => {
    Product.findAll()
      .then((products) => {
        const productsWithDiscount = products.filter((product) => product.discount > 0);
        res.render('products/product-list', {
          products,
          offers: productsWithDiscount
        });
      })
  },

  redirect: (req, res) => {
    res.redirect('/');
  },

  loadSandwich: (req, res) => {
    res.render('products/product-create-form');
  },

  createProduct: (req, res) => {
    const { name, type, description, price, stock, discount } = req.body;

    Product.create({
      name,
      type,
      description,
      price,
      stock,
      discount,
      image: req.file?.filename,
    })
      .then(() => {
        res.redirect('/products');
      })
  },

  searchProduct: (req, res) => {
    const { search } = req.query;
    console.log(search)
    Product.findAll({
      where: {
        name: {
          [db.Sequelize.Op.like]: `%${search}%`
        }
      }
    })
      .then((products) => {
        res.render('products/results', {
          products: products
        });
      })
  }
}

module.exports = { productsController }