const express = require('express');
const Order = require('../models/Order'); // Предполагая, что у вас есть модель Order
const auth = require('../middleware/auth'); // Middleware для аутентификации
const router = express.Router();

// Создание нового заказа
router.post('/', auth, async (req, res) => {
    try {
        const order = new Order({
            userId: req.user._id, // auth middleware добавляет user в req
            productId: req.body.productId,
            quantity: req.body.quantity, // Если есть
            totalPrice: req.body.totalPrice // Если есть
        });
        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Получение всех заказов для конкретного пользователя
router.get('/user/:id', auth, async (req, res) => {
    console.log(req.params.id)
    try {
        const orders = await Order.find({ userId: req.params.id }).populate('productId');
        res.status(200).send(orders);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
