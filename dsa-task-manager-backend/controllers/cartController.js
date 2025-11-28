// dsa-task-manager-backend/controllers/cartController.js

// --- DSA Concept: JavaScript Map (Hash Map) ---
const cart = new Map(); // O(1) access for items

const calculateTotal = () => {
    let total = 0;
    for (const item of cart.values()) {
        total += item.price * item.quantity;
    }
    return parseFloat(total.toFixed(2));
};

// GET /api/cart
exports.getCart = (req, res) => {
    const items = Array.from(cart.values());
    res.status(200).json({
        message: "Cart fetched successfully.",
        items,
        totalValue: calculateTotal()
    });
};

// POST /api/cart/add
exports.addItem = (req, res) => {
    const { itemId, name, price, quantity = 1 } = req.body;

    if (!itemId || !name || !price) {
        return res.status(400).json({ message: "Missing item details." });
    }

    const numericQuantity = parseInt(quantity);
    if (cart.has(itemId)) {
        // O(1) lookup and update
        const existingItem = cart.get(itemId);
        existingItem.quantity += numericQuantity;
        cart.set(itemId, existingItem);
        res.status(200).json({ 
            message: `${name} quantity updated. (O(1) update)`,
            cart: Array.from(cart.values())
        });
    } else {
        // O(1) insertion
        cart.set(itemId, { itemId, name, price: parseFloat(price), quantity: numericQuantity });
        res.status(201).json({ 
            message: `${name} added to cart. (O(1) insertion)`,
            cart: Array.from(cart.values())
        });
    }
};

// DELETE /api/cart/remove/:itemId
exports.removeItem = (req, res) => {
    const { itemId } = req.params;

    if (cart.has(itemId)) {
        // O(1) deletion
        const deleted = cart.get(itemId);
        cart.delete(itemId);
        res.status(200).json({
            message: `${deleted.name} removed from cart. (O(1) deletion)`,
            cart: Array.from(cart.values())
        });
    } else {
        res.status(404).json({ message: "Item not found in cart." });
    }
};