const mongoose = require('mongoose')

const getProducts = mongoose.Schema({
    
        name: String,
        description: String,
        price: Number, 
        lager: Number
})

module.exports = mongoose.model('users', getProducts)