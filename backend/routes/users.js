var express = require('express');
var router = express.Router();
const userModel = require('../models/userModel')

// Vissa av testerna ska skicka tillbaka bara delar av ex objectet jag hämtar från databasen

/*Get users*/
router.get('/', async (req, res) => {
  const users = await userModel.find()
  
  if(users.length === 0){
    res.status(404).json({message:"Can't get users"})
  } else {
    res.status(200).json(users)
  }
});

/* Get specific user */
router.post('/', async (req, res) => {
  const userId = req.body.id;
  console.log(req.body.id)
  const user = await userModel.findById({_id: userId})
  console.log(user)
    res.status(200).json(user)
  
});

/* Add new user */
router.post('/add', async (req, res) => {

  const newUser = new userModel(req.body)
  
  if(!req.body.name || !req.body.password || !req.body.email){ 
    console.log("Missing password, name or email");
    res.status(400).json({message: "Missing password, name or email"})
    return
  } else {
    await newUser.save()
    res.status(201).json(newUser)
  }
});

/*Log in*/
router.post('/login', async (req, res) => {

  let loginValue = req.body;
  const users = await userModel.findOne().select("+password")

  if((loginValue.password === users.password) && (loginValue.email === users.email)){
    console.log("Inloggad")
  } else {
    console.log("Användaren finns inte")
  }
});

module.exports = router;