// dsa-task-manager-backend/routes/cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// GET /api/cart (Fetch all items)
router.get('/', cartController.getCart);

// POST /api/cart/add (Add or update item)
router.post('/add', cartController.addItem);

// DELETE /api/cart/remove/:itemId (Remove item)
router.delete('/remove/:itemId', cartController.removeItem); 

module.exports = router;
