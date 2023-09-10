const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { productsController } = require('../controllers/productsController');

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathImage= path.join(__dirname, '..','public','img');
        cb(null, pathImage);
    },
    filename: (req, file, cb) => {
        const fileNewName= "sandwich" + Date.now() + path.extname(file.originalname);
        cb(null, fileNewName);
    }
});
const upload=multer({ storage: productStorage })

router.get('/', productsController.productList)

router.get('/detail/:id', productsController.productDetail)

router.get('/edit/:id', productsController.productEdit)

router.put('/edit/:id', productsController.productUpdate)

router.delete('/delete/:id', productsController.deleteProduct)

router.get('/create', productsController.loadSandwich)

router.post('/create', upload.single('image'), productsController.createProduct)

router.get('/result', productsController.searchProduct)

module.exports = router