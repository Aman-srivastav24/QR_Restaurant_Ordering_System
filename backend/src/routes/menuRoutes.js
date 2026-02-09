const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/authMiddleware');
const menuController = require('../controllers/menuController');   

//GET /api/menu #PUBLIC
router.get('/', menuController.getMenuItems);

//POST /api/menu #PRIVATE
router.post('/',verifyAdmin, menuController.createMenuItem);

//PUT /api/menu/:id #PRIVATE
router.put('/:id',verifyAdmin, menuController.updateMenuItem);

//DELETE /api/menu/:id #PRIVATE soft delete
router.delete('/:id',verifyAdmin, menuController.deleteMenuItem);

module.exports = router;    