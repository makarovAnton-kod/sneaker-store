import express from 'express';
import Order from '../models/Order.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Создание нового заказа
router.post('/', auth, async (req, res) => {
    try {
        const order = new Order({
            userId: req.user._id,
            productId: req.body.productId,
            quantity: req.body.quantity || 1,
            totalPrice: req.body.totalPrice || 0
        });
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Получение всех заказов для конкретного пользователя
router.get('/user/:id', auth, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.id }).populate('productId');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;
