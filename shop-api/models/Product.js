import {model, Schema} from 'mongoose';

const ProductSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: String,
        image: String,
    },
    {timestamps: true},
);

const Product = model('Product', ProductSchema);

export default Product;
