const mongoose = require('mongoose');

const productionSchema = mongoose.Schema({
    productId: {
        type: mongoose.Types.ObjectId,
        required: false,
        auto: true
    },
    productName: {
        type: String,
        required: true
    },
    amountSpent: {
        type: Number,
        required: true
    },
    confirmation: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Production', productionSchema);