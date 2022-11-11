const mongoose = require('mongoose')

const PinSchema = new mongoose.Schema({
    activationPin: {
        type: String,
        required: true
    },
    activated: {
        type: Boolean,
        required: false
    },
    materialId: {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Pin', PinSchema)