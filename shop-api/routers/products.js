import { Router } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product.js';
import auth from '../middleware/auth.js';
import {imagesUpload} from '../multer.js';

const productsRouter = Router();

productsRouter.get('/', async (_req, res, next) => {
  try {
    const results = await Product.find();
    res.send(results);
  } catch (e) {
    return next(e);
  }
});

productsRouter.get('/:id', async (req, res, next) => {
  try {
    let _id;
    try {
      _id = new mongoose.Types.ObjectId(req.params.id);
    } catch {
      return res.status(404).send({ error: 'Wrong ObjectId!' });
    }

    const product = await Product.findById(_id);

    if (!product) {
      return res.status(404).send({ error: 'Not found!' });
    }

    res.send(product);
  } catch (e) {
    next(e);
  }
});

productsRouter.post(
    '/',
    // auth,
    imagesUpload.single('image'),
    async (req, res, next) => {
      try {
        const productData = {
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
    },
);

productsRouter.patch(
    '/:id',
    // auth,
    imagesUpload.single('image'),
    async (req, res, next) => {
      try {
        let image = undefined;
        if (req.body.image === 'delete') {
          image = null;
        } else if (req.file) {
          image = req.file.filename;
        }
        const result = await Product.updateOne(
            { _id: req.params.id },
            {
              $set: {
                title: req.body.title,
                price: parseFloat(req.body.price),
                description: req.body.description,
                image,
              },
            }
        );
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: 'Not found!' });
        }
        res.send({ message: 'ok' });
      } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
          return res.status(422).send(e);
        }
        next(e);
      }
    }
);

export default productsRouter;
