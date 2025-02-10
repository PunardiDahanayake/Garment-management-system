const mongoose = require('mongoose')

var Account =  mongoose.model('Account',{
    accountId: {
        type: mongoose.Types.ObjectId,
        required: false,
        auto: true
    },
    empId: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true
    },
    salaryType: {
        type: String,
        required: true
    },
    laborCost: {
        type: Number,
        required: true
    }
})
module.exports = {Account}