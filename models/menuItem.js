const mongoose = require('mongoose');

// Define menuItem schema
const menuItemschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    taste: {
        type: String,
        enum: ["spicy", "sweet", "sour"],
        required: true
    },

    is_drink: {
        type: Boolean,
        default: false
    },

    ingredients: {  
        type: [String],
        default: []
    },

    num_sales: {
        type: Number,
        default: 0
    }
});

const menuItem = mongoose.model('menuItem', menuItemschema);
module.exports = menuItem;
