const mongoose = require('mongoose');

const qualityControlSchema = mongoose.Schema({
    fabricId: {
        type: mongoose.Types.ObjectId,
        required: false,
        auto: true
    },
    type: {
        type: String,
        required: true
    },
    remark: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reportedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Quality_Control', qualityControlSchema);