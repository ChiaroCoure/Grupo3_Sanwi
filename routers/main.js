const express = require('express');
const { mainController } = require('../controllers/mainController');
const router = express.Router();

router.get('/', mainController.home)

router.get('/login', mainController.login)

router.get('/register', mainController.register)

router.get('/billing', mainController.billing)

router.get('/product-detail/:id', mainController.productDetail)

router.get('/products-cart', mainController.productsCart)

router.get('/load-sandwich', mainController.loadSandwich)

router.post(['/register', '/billing', '/login', '/load-sandwich'], mainController.redirect)


module.exports = { router } ;