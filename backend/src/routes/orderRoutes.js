const express = require('express');
const router = express.Router();

const orderController = require('../controllers/orderController');
const { verifyAdmin } = require('../middleware/authMiddleware');

/**
 * POST /orders
 * Public (customer)
 */
router.post('/', orderController.placeOrder);

/**
 * GET /orders
 * Admin only
 */
router.get('/', verifyAdmin, orderController.getOrders);

/**
 * PUT /orders/:id
 * Admin only (status update)
 */
router.put('/:id', verifyAdmin, orderController.updateOrderStatus);

module.exports = router;
