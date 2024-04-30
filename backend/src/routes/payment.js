const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// POST /api/payment/charge
router.post('/charge', paymentController.charge);

module.exports = router;
