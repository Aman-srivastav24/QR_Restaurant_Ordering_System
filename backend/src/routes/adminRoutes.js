const express = require('express');
const router = express.Router();

const { getAdminMenu } = require('../controllers/menuController');
const { verifyAdmin } = require('../middleware/authMiddleware');

router.get('/menu', verifyAdmin, getAdminMenu);

module.exports = router;
