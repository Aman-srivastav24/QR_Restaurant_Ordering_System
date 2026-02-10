const prisma = require('../prisma');

const placeOrder = async (payload) => {
  const { tableNumber, customerName, items } = payload;

  // Validation
  if (!tableNumber || typeof tableNumber !== 'number' || tableNumber <= 0) {
    throw new Error('Invalid table number');
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Order must contain at least one item');
  }

  for (const item of items) {
    if (!item.menuItemId) {
      throw new Error('Menu item ID is required');
    }

    if (!item.quantity || item.quantity <= 0) {
      throw new Error('Invalid item quantity');
    }
  }

  // Fetch menu items
  const menuItemIds = items.map(i => i.menuItemId);

  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: { in: menuItemIds },
      available: true
    }
  });

  if (menuItems.length !== menuItemIds.length) {
    throw new Error('One or more menu items are unavailable');
  }

  // Prepare order items with price snapshot
  const orderItemsData = items.map(item => {
    const menuItem = menuItems.find(m => m.id === item.menuItemId);

    return {
      menuItemId: menuItem.id,
      quantity: item.quantity,
      price: menuItem.price
    };
  });

  // TRANSACTION START
  const result = await prisma.$transaction(async (tx) => {
    // 1. Create order
    const order = await tx.order.create({
      data: {
        tableNo: tableNumber,
        customerName: customerName || null
      }
    });

    // 2. Create order items
    await tx.orderItem.createMany({
      data: orderItemsData.map(item => ({
        orderId: order.id,
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: item.price
      }))
    });

    return order;
  });

  return {
    orderId: result.id,
    status: 'PLACED'
  };
};

const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      items: {
        include: {
          menuItem: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return orders.map(order => {
    const totalAmount = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return {
      orderId: order.id,
      tableNumber: order.tableNo,
      customerName: order.customerName,
      status: order.status,
      createdAt: order.createdAt,
      totalAmount,
      items: order.items.map(item => ({
        menuItemName: item.menuItem.name,
        quantity: item.quantity,
        price: item.price,
      })),
    };
  });
};

module.exports = {
  placeOrder,
  getAllOrders
};


