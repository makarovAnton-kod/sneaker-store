// models/SeedStatus.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seedStatusSchema = new Schema({
    seeded: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('SeedStatus', seedStatusSchema);
