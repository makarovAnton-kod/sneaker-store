import express from 'express';
import Order from '../models/Order.js';
import auth from '../middleware/auth.js';
import permit from "../middleware/permit.js";

const router = express.Router();

router.get('/', auth, permit('admin'), async (req, res) => {
    try {
        const orders = await Order.find().populate('productId userId');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
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

router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).send({ error: 'Заказ не найден' });
        }

        await order.deleteOne();
        res.send({ message: 'Заказ успешно удален' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
router.put('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const { quantity, totalPrice } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).send({ message: 'Заказ не найден' });
        }

        if (quantity) order.quantity = quantity;
        if (totalPrice) order.totalPrice = totalPrice;

        await order.save();
        res.send(order);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;


