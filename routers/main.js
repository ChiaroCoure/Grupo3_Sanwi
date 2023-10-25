const express = require('express');
const router = express.Router();
const { userRoute } = require('../middlewares/userRoute');

const  mainController  = require('../controllers/mainController');

router.get('/', mainController.home)

router.get('/billing', mainController.billing) 

router.get('/cart', userRoute, mainController.cart)

module.exports = router