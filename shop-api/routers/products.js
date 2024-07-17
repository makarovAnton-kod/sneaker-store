const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const Product = require("../models/Product");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");


const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    },
});
const upload = multer({storage});

router.get('/', async (req, res) => {
    const sort = {};
    const query = {};
    if (req.query.orderBy === 'price' && req.query.direction === 'desc') {
        sort.price = -1;
    }
    if (req.query.filter === 'image') {
        query.image = {$ne: null};
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
    } catch {
        res.sendStatus(500);
    }
});
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).send({message: 'Product not found!'});
        }
        res.send(product);
    } catch {
        res.sendStatus(500);
    }
});
router.post('/', auth, permit('admin'), upload.single('image'), async (req, res) => {

        try {
            const {title, price, category, description} = req.body;
            const productData = {
                title,
                price,
                category,
                description: description || null,
                image: null,
            };
            if (req.file) {
                productData.image = 'uploads/' + req.file.filename;
            }
            const product = new Product(productData);
            await product.save();
            res.send(product);
        } catch {
            res.sendStatus(500);
        } catch (e) {
            res.status(400).send(e);
        }
    });
    router.put('/:id', async (req, res) => {
        const productData = {
            title: req.body.title,
            price: req.body.price,
            description: req.body.description,
            image: null,
        };
        if (req.file) {
            productData.image = req.file.filename;
        }
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                res.status(404).send({message: 'Product not found!'});
            }
            const updateProduct = await Product
                .findByIdAndUpdate(req.params.id, productData, {new: true});
            res.send(updateProduct);
        } catch {
            res.sendStatus(500);
        }
    });
