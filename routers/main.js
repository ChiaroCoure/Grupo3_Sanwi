const express = require('express');
const router = express.Router();

const  mainController  = require('../controllers/mainController');

router.get('/', mainController.home)

router.get('/billing', mainController.billing) 

router.get('/cart', mainController.cart)

module.exports = router