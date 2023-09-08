const express = require('express');
const { productsController } = require('../controllers/productsController');
const router = express.Router();

router.get('/detail/:id', productsController.productDetail)

router.get('/edit/:id', productsController.productEdit)
router.put('/edit/:id', productsController.productUpdate)

router.delete('/delete/:id', productsController.deleteProduct)

router.get('/products-cart', productsController.productsCart)

router.get('/load-sandwich', productsController.loadSandwich)

router.get('/product-list', productsController.productList)

router.post(['/load-sandwich'], productsController.redirect)

module.exports = router