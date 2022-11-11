const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String, 
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    courses: {
        type: Array, 
        required: false
    },
    // city: {
    //     type: String, 
    //     required: true
    // },
    // post: {
    //     type: Array,
    //     required: false
    // },
    // comment: {
    //     type: Array,
    //     required: false
    // },
    password: {
        type: String,
        required: true
    },
    confirmPassword: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('admin', AdminSchema);