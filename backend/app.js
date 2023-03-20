var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

async function init() {
    try{
        const options = { useNewUrlParser: true, useUnifiedTopology: true}
        mongoose.connect('mongodb://localhost:27017/webbshop', options)
        console.log("Connected to database")
    } catch (error) {
        console.log(error)
    }
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

init()

module.exports = app;