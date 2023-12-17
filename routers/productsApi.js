const express = require('express');
const productApiController = require('../controllers/productApiController');
const { upload } = require('../middlewares/validateProduct');
const router = express.Router();

router.get(
  '/',
  productApiController.getProducts
);

router.get(
  '/:id',
  productApiController.getProduct
);

router.delete(
  '/:id',
  productApiController.removeProduct
);

router.put(
  '/:id',
  upload.single('image'),
  productApiController.updateProduct
);

module.exports = router;