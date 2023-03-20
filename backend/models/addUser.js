const mongoose = require('mongoose')

const getUsers = mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        select: false
}})


module.exports = mongoose.model('users', getUsers)