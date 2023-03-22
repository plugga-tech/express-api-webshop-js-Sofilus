const mongoose = require('mongoose')

const orders = mongoose.Schema({
    
    user: String,
    products: [
        {
            productId:{
                type: mongoose.Types.ObjectId,
                ref: 'products'
            },
            quantity: {
                type: Number
            }
        }
    ]
})

module.exports = mongoose.model('orders', orders)