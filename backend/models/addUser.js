const mongoose = require('mongoose')

const getUsers = mongoose.Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model('users', getUsers)