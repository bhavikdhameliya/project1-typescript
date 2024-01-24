const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

const reviewModel = mongoose.model('reviews', reviewSchema);
export default reviewModel;