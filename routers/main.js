const express = require('express');
const { mainController } = require('../controllers/mainController');
const router = express.Router();

router.get('/', mainController.home)

router.get('/login', mainController.login)

router.get('/register', mainController.register)

router.get('/billing', mainController.billing)

router.get('/product-detail/:id', mainController.productDetail)

router.get('/products-cart', mainController.productsCart)

router.post(['/register', '/billing'], mainController.redirect)


module.exports = { router } ;