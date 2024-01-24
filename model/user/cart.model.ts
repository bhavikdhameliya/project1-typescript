const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    cartItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    quntity: {
        type: Number,
        default: 1
    },
    isDelete: {
        type: Boolean,
        default: false
    }
})

const cartModel = mongoose.model('carts', cartSchema);
export default cartModel