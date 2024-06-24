const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    status: { type: Number, default: 1 },
}) 

module.exports = mongoose.models.Product || mongoose.model('Product', ProductSchema)