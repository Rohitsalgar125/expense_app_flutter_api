const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const commentSchema = mongoose.Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'users'
    },
    bookId: {
        type: ObjectId,
        required: true,
        ref: 'books'
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('comments', commentSchema)