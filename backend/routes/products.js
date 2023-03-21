var express = require('express');
var router = express.Router();
const getProducts = require('../models/getProducts')

/* Get products*/ 
router.get('/', async (req, res) => {

  const products = await getProducts.find()
  
  if(products.length === 0){
    res.status(404).json({message:"Can't get products"})
  } else {
    res.status(200).json(products)
  }
});

/* Create new product */ 
router.post('/add', async (req, res) => {

    const newProduct = new getProducts(req.body)
    
    if(!req.body.name || !req.body.description || !req.body.price || !req.body.lager){ 
      console.log("Missing name, description, price or lager");
      res.status(400).json({message: "Missing name, description, price or lager"})
      return
    } else{
      await newProduct.save()
      res.status(201).json(newProduct)
    }
  });

module.exports = router;