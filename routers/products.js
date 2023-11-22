const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { productsController } = require('../controllers/productsController');

const { validateProduct, upload } = require('../middlewares/validateProduct')


router.get(
  '/',
  productsController.productList
);

router.get(
  '/detail/:id',
  productsController.productDetail
);

router.get(
  '/edit/:id',
  productsController.productEdit
);

router.put(
  '/edit/:id',
  upload.single('image'),
  productsController.productUpdate
);

router.delete(
  '/delete/:id',
  productsController.deleteProduct
);

router.get(
  '/create',
  productsController.loadSandwich
);

router.post(
  '/create',
  upload.single('image'), 
  validateProduct,
  productsController.createProduct
);

router.get(
  '/result',
  productsController.searchProduct
);

module.exports = router