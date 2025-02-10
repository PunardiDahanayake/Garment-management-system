const mongoose = require('mongoose');

const inventoryStockSchema = mongoose.Schema({
    itemCode: {
        type: mongoose.Types.ObjectId,
        required: false,
        auto: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    expireDate: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Inventory_Stock', inventoryStockSchema);