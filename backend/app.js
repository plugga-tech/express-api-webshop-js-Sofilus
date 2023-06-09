var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products')
var orderRouter = require('./routes/orders')

var app = express();
app.use(cors())

async function init(){
    try {
        const options = {useNewUrlParser: true, useUnifiedTopology: true}
        await mongoose.connect("mongodb://127.0.0.1:27017/sofia-olsson", options)
        console.log("Connected to database")
    }
    catch (error) {
        console.error(error)
    }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', orderRouter);

init()

module.exports = app;