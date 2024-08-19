import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const { Schema } = mongoose;

const CategorySchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
});

CategorySchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique' });

const Category = mongoose.model('Category', CategorySchema);

export default Category;
