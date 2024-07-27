const express = require('express');
const Category = require('../models/Category');
const router = express.Router();
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch {
        res.sendStatus(500);
    }
});
router.post('/', async (req, res) => {
    const {title, description} = req.body;
    if (!title) {
        res.status(400).send({error: ' Title is Required!'});
    }
    const categoryData = {title, description: description || null};
    const category = new Category(categoryData);
    try {
        await category.save();
        res.send(category);
    } catch (e) {
        res.status(400).send({error: e.errors});
    }
});
module.exports = router;