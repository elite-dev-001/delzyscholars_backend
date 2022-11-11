const mongoose = require('mongoose')

const MaterialSchema = new mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    courseCode:{
        type: String,
        required: true
    },
    creatorId:{
        type: String,
        required: true
    },
    courseAmount:{
        type: String,
        required: true
    },
    courseImg:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    students:{
        type: Array,
        required: false
    },
    content:{
        type: Array,
        required: false
    },
    // authorImg:{
    //     type: String,
    //     required: true
    // },
    // :{
    //     type: String,
    //     required: true
    // },
})

module.exports = mongoose.model('materials', MaterialSchema)