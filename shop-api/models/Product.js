const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    description: {
        type: String,
    },
    image: String
});
ProductSchema.plugin(idValidator, {message : 'Bad ID value for {PATH}'});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;