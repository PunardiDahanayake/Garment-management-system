const mongoose = require('mongoose')

var IndustrialEngineering = mongoose.model('Industrial_Engineering',{
    poductMethod: {
        type: String,
        require: true
    },
    researchStatus: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    cost: {
        type: Number,
        require: true
    }
})

module.exports = { IndustrialEngineering }