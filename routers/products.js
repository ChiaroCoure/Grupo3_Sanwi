const express = require('express');
const { productsController } = require('../controllers/productsController');
const router = express.Router();

router.get('/product-detail/:id', productsController.productDetail)

router.get('/products-cart', productsController.productsCart)

router.get('/load-sandwich', productsController.loadSandwich)

router.post(['/load-sandwich'], productsController.redirect)

module.exports = router