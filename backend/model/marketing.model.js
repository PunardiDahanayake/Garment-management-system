const mongoose = require('mongoose');

const marketingSchema = mongoose.Schema({
    productName: {
        type: String,
        unique: true,
        required: false
    },
    marketingCost: {
        type: Number,
        required: true
    },
    remarks: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    approveStatus: {
        type: String,
        required: true
    },
    informedStatus: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    }
});
module.exports = mongoose.model('Marketing', marketingSchema);