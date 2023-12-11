const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const db = require('../dataBase/models');
const { Category } = db;

const productStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const pathImage = path.join(__dirname, '..', 'public', 'img/products');
        cb(null, pathImage);
    },
    filename: (req, file, cb) => {
        const fileNewName = "sandwich" + Date.now() + path.extname(file.originalname);
        cb(null, fileNewName);
    }
});

const upload = multer({ storage: productStorage });

const validateProduct = [
    body('name').isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres.'),
    body('price').isNumeric().withMessage('El precio debe ser un número.'),
    body('stock').isNumeric().withMessage('La cantidad disponible debe ser un número.'),
    body('discount').isNumeric().withMessage('El descuento debe ser un número.'),
    body('description').isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),
    body('image').custom((value, { req }) => {
      let file = req.file;
      let acceptedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];

      if (!file) {
        throw new Error('Tienes que subir una imagen');
      }

      let fileExtension = path.extname(file.originalname);

      if (!acceptedExtensions.includes(fileExtension)) {
        throw new Error(`Las extensiones aceptadas son ${acceptedExtensions.join(', ')}`);
      }

      return true;
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
  
        return Category.findAll()
        .then((categories) => {
          res.render('products/product-create-form', {
            errors: errors.mapped(), 
            old: req.body,
            categories
          });
        })
      }
      else {
        next();
      }
    }
];

module.exports = { validateProduct, upload };