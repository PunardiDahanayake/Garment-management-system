const mongoose = require('mongoose')

var PatternMaking = mongoose.model('Pattern_Making',{
  
    designName: {
        type: String,
        require: true
    },
    material: {
        type: String,
        require: true
    },
    materialCost: {
        type: Number,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    genderType: {
        type: String,
        require: true
    },
    designDate: {
        type: Date,
        default: Date.now,
        require: true
    },
    size: {
        type: String,
        require: true
    }
})
module.exports =  {PatternMaking}