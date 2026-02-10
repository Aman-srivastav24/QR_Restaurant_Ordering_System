const orderService = require('../services/orderService');
const placeOrder = async (req, res) => {
  try {
    const order = await orderService.placeOrder(req.body);

    return res.status(201).json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Place order error:', error);

    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to place order'
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    return res.status(200).json({
      success: true,
      data: orders
    });
  } catch (error) {
    console.error('Get orders error:', error);

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch orders'
    });
  }
};


const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await orderService.updateOrderStatus(orderId, status);

    return res.status(200).json({
      success: true,
      data: {
        orderId: updatedOrder.id,
        status: updatedOrder.status
      }
    });
  } catch (error) {
    console.error('Update order status error:', error.message);

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


module.exports = {
  placeOrder,
  getOrders,
  updateOrderStatus
};
