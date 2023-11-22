const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const db = require('../dataBase/models');
const { Category } = db;


// Configuración de Multer
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

// Middleware de validación
const validateProduct = [
    body('name').isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres.'),
    body('description').isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres.'),
    body('image').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Debes subir una imagen.');
        }

        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const ext = path.extname(req.file.originalname).toLowerCase();

        if (!allowedExtensions.includes(ext)) {
            throw new Error('Solo se permiten archivos JPG, JPEG, PNG o GIF.');
        }

        return true;
    }).withMessage('Solo se permiten archivos JPG, JPEG, PNG o GIF.'),
    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            const errorMessages = {};
            errors.array().forEach(error => {
                switch (error.param) {
                    case 'name':
                        errorMessages.name = error.msg;
                        break;
                    case 'description':
                        errorMessages.description = error.msg;
                        break;
                    case 'image':
                        errorMessages.image = error.msg;
                        break;
                }
            });
    
            return Category.findAll()
            .then((categories) => {
                res.render('products/product-create-form', { categories , errorMessages});
            })
        }
        else
        {
            next();
        }
    }
];

module.exports = { validateProduct, upload };