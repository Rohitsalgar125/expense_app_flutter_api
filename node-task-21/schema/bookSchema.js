const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId

const bookSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "users",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    status: {
        type: Number,
        default: 1                    // 1 - active  , 2 - deleted book
    }
}, {
    timestamps: true,
    versionKey: false
})


module.exports = mongoose.model('books', bookSchema)
