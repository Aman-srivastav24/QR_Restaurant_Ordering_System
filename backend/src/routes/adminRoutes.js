const express = require('express');
const router = express.Router();

const { getAdminMenu } = require('../controllers/menuController');
const { verifyAdmin } = require('../middleware/authMiddleware');
const { getOrders,updateOrderStatus } = require('../controllers/orderController');

router.get('/orders', verifyAdmin, getOrders);

router.get('/menu', verifyAdmin, getAdminMenu);

router.put('/orders/:orderId/status', verifyAdmin, updateOrderStatus);

module.exports = router;
