const express = require('express');
const router = express.Router();

const { getAdminMenu } = require('../controllers/menuController');
const { verifyAdmin } = require('../middleware/authMiddleware');
const { getOrders } = require('../controllers/orderController');

router.get('/orders', verifyAdmin, getOrders);

router.get('/menu', verifyAdmin, getAdminMenu);

module.exports = router;
