const express = require('express');
const User = require('../models/User');
const axios = require('axios');
const {nanoid} = require('nanoid');
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const {email, password, displayName} = req.body;
        const userData = {email, password, displayName};
        const user = new User(userData);
        user.generateToken();
        await user.save();
        res.send({message: 'User was created!', user});
    } catch (e) {
        res.status(400).send(e);
    }
});
router.post('/sessions', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(401).send({message: 'Credentials are wrong!'});
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
        return res.status(401).send({message: 'Credentials are wrong!'});
    }
    user.generateToken();
    await user.save({validateBeforeSave: false});
    res.send({message: 'Username and password correct!', user})
});
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const { displayName } = req.body;

    try {
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Обновляем только displayName
        user.displayName = displayName;

        // Сохраняем изменения без валидации и без изменения токена
        await user.save({ validateBeforeSave: false });

        res.send({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});
router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};
    if (!token) return res.send(success);
    const user = await User.findOne({token});
    if (!user) return res.send(success);
    user.generateToken();
    await user.save({validateBeforeSave: false});
    return res.send({success, user});
});
module.exports = router;