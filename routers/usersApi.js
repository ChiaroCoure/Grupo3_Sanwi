const express = require('express');
const router = express.Router();
const userApiController = require('../controllers/userApiController');

router.get(
  '/:id',
  userApiController.getOneUser
)

module.exports = router;