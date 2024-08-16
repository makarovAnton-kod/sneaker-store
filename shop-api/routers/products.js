const express = require('express');
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const {imagesUpload} = require("../multer");

const router = express.Router();

// Получение всех продуктов
router.get('/', async (req, res) => {
    const sort = {};
    const query = {};

    if (req.query.orderBy === 'price' && req.query.direction === 'desc') {
        sort.price = -1;
    }
    if (req.query.filter === 'image') {
        query.image = { $ne: null };
    }
    if (req.query.category) {
        query.category = req.query.category;
    }

    try {
        const products = await Product
            .find(query)
            .sort(sort)
            .populate('category', 'title description');
        res.send(products);
    } catch (e) {
        console.error('Error fetching products:', e);
        res.sendStatus(500);
    }
});

// Получение продукта по ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({ message: 'Product not found!' });
        }
        res.send(product);
    } catch (e) {
        console.error('Error fetching product:', e);
        res.sendStatus(500);
    }
});

// Создание нового продукта
router.post('/',
    auth,
    permit('admin', 'editor'),
    imagesUpload.single('image'),
    async (req, res, next) => {
        try {
            const productData = {
                category: req.body.category,
                title: req.body.title,
                price: parseFloat(req.body.price),
                description: req.body.description,
                image: req.file ? req.file.filename : null,
            };

            const product = new Product(productData);
            await product.save();

            res.send(product);
        } catch (e) {
            if (e instanceof mongoose.Error.ValidationError) {
                return res.status(422).send(e);
            }

            next(e);
        }
    }
);

// Обновление продукта по ID
router.put('/:id',
    auth,
    permit('admin'),
    imagesUpload.single('image'),
    async (req, res) => {
        try {
            const { title, price, description } = req.body;
            const productData = {
                title,
                price,
                description,
            };

            if (req.file) {
                productData.image = req.file.filename;
            }

            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).send({ message: 'Product not found!' });
            }

            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
            res.send(updatedProduct);
        } catch (e) {
            console.error('Error updating product:', e);
            res.sendStatus(500);
        }
    }
);

// Удаление продукта
router.delete('/:id', auth, permit('admin'), async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send({error: 'Product not found'});
        }

        await product.deleteOne();
        res.send({message: 'Product deleted successfully'});
    } catch (e) {
        res.sendStatus(500);
    }
});

module.exports = router;
