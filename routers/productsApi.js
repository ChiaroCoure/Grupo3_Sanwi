const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const productApiController = require('../controllers/productApiController');

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathImage = path.join(__dirname, '..', 'public', 'img/products');
        cb(null, pathImage);
    },
    filename: (req, file, cb) => {
      console.log('file', file);
        const fileNewName = "sandwich" + Date.now() + path.extname(file.originalname);
        cb(null, fileNewName);
    }
});

const upload = multer({ storage: productStorage });

router.get(
  '/',
  productApiController.getProducts
);

router.get('/last', productApiController.lastProduct)

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