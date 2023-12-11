const express = require('express');
const productApiController = require('../controllers/productApiController');
const router = express.Router();

router.get('/', productApiController.getProducts)

module.exports = router;