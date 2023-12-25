// routes/tokenRoutes.js
const express = require('express');
const tokenController = require('../controllers/tokenController');

const router = express.Router();

router.get('/generateToken/:length?', tokenController.generateToken);

module.exports = router;
