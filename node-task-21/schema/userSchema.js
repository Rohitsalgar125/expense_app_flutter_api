const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 1             // 1 - active user , 2 - deleted user
    },
    designation: {
        type: String,
        default: 1
    },
    profilePic: {
        type: String,
    },
    filePath: {
        type: String,
    }
}, {
    timestamps : true, 
    versionKey: false
})

module.exports = mongoose.model('users', userSchema)