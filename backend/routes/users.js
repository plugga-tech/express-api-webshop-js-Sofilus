var express = require('express');
var router = express.Router();
const getUsers = require('../models/addUser')

/* Get users*/
router.get('/', async (req, res) => {
  const users = await getUsers.find()
  
  if(!users){
    res.status(404).json({error:"Can't get users"})
  } else {
    res.status(200).json(users)
    console.log(users)
  }
});

/* Add new user */
router.post('/add', async (req, res) => {

  const newUser = new getUsers(req.body)
  
  if(!req.body.name || !req.body.password || !req.body.email){ 
    console.log("Missing password, name or email");
    res.status(400).json({error: "Missing password, name or email"})
    return
  } else{
    await newUser.save()
    res.status(201).json(newUser)
  }
});

module.exports = router;
