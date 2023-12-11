const express = require('express');
const router = express.Router();
const userApiController = require('../controllers/userApiController');

router.get('/:id', userApiController.getOneUser)
router.get('/', userApiController.getUsers)

module.exports = router;