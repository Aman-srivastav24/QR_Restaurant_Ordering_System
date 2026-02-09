const prisma = require('../prisma');

/**
 * GET /api/menu
 * Public - Customer menu
 */
const getMenuItems = async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: { available: true },
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        imageUrl: true,
        available: true
      }
    });

    return res.status(200).json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    console.error('Get menu error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch menu'
    });
  }
};

/**
 * GET /api/admin/menu
 * Admin - full menu
 */
const getAdminMenu = async (req, res) => {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({
      success: true,
      data: menuItems
    });
  } catch (error) {
    console.error('Admin menu error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch admin menu'
    });
  }
};

/**
 * POST /api/menu
 * Admin only
 */
const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;

    if (!name || price == null) {
      return res.status(400).json({
        success: false,
        message: 'Name and price are required'
      });
    }

    const menuItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        adminId: req.admin.id
      }
    });

    return res.status(201).json({
      success: true,
      data: { id: menuItem.id }
    });
  } catch (error) {
    console.error('Create menu error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create menu item'
    });
  }
};

/**
 * PUT /api/menu/:id
 * Admin only
 */
const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, available } = req.body;

    await prisma.menuItem.update({
      where: { id },
      data: {
        name,
        description,
        price,
        available
      }
    });

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Update menu error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update menu item'
    });
  }
};

/**
 * DELETE /api/menu/:id
 * Admin only (soft delete)
 */
const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.menuItem.update({
      where: { id },
      data: { available: false }
    });

    return res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error('Delete menu error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete menu item'
    });
  }
};

module.exports = {
  getMenuItems,
  getAdminMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
