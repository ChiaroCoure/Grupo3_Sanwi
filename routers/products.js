const express = require('express');
const router = express.Router();
const { productsController } = require('../controllers/productsController');

router.get('/', productsController.productList)

router.get('/detail/:id', productsController.productDetail)

router.get('/edit/:id', productsController.productEdit)

router.put('/edit/:id', productsController.productUpdate)

router.delete('/delete/:id', productsController.deleteProduct)

router.get('/create', productsController.loadSandwich)

router.post(['/load-sandwich'], productsController.redirect)

module.exports = router