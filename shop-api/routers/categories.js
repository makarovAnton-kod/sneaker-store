const express = require('express');
const Category = require("../models/Category");
const router = express.Router();

// Получение списка всех категорий
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (e) {
        res.sendStatus(500);
    }
});

// Получение конкретной категории по ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send({error: 'Category not found'});
        }
        res.send(category);
    } catch (e) {
        res.sendStatus(500);
    }
});

// Создание новой категории
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const category = new Category({ title, description });

    try {
        await category.save();
        res.status(201).send(category);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Обновление категории
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send({error: 'Category not found'});
        }

        category.title = req.body.title;
        category.description = req.body.description || category.description;

        await category.save();
        res.send(category);
    } catch (e) {
        res.status(400).send(e);
    }
});

// Удаление категории
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).send({error: 'Category not found'});
        }

        await category.deleteOne();
        res.send({message: 'Category deleted successfully'});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;
