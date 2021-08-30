const authController = require('../controllers/auth');
const express = require('express');
const router = express.Router();

router.get('/', authController.get);

module.exports = router;