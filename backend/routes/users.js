var express = require('express');
var router = express.Router();
const userModel = require('../models/addUser')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Add new user */
router.post('/add', async (req, res) => {

  const newUser = new userModel(req.body)
  
  if(!req.body.name || !req.body.password || !req.body.email){ 
    console.log("Missing password, name or email");
    res.status(404).json("Missing password, name or email") // Är de rätt statuskod? Räcker de att de skrivs ut i loggen?
    return
  } else{
    await newUser.save()
    res.status(201).json(newUser)
  }
});

module.exports = router;
