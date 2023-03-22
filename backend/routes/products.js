var express = require('express');
var router = express.Router();
const productModel = require('../models/productModel')
const { ObjectId } = require("mongodb");

/* Get products*/ 
router.get('/', async (req, res) => {

  const products = await productModel.find()
  
  if(products.length === 0){
    res.status(404).json({message:"Can't get products"})
  } else {
    res.status(200).json(products)
  }
});

/* Get specific product*/
router.get('/:productId', async (req, res) => {
  let id = req.params.productId;
  const product = await productModel.findOne({"_id": new ObjectId(id)})
  
  if(!product){
    res.status(404).json({message:"Can't get products"})
  } else {
    res.status(200).json(product)
  }
});


/* Create new product */ 
router.post('/add', async (req, res) => {

    const newProduct = new productModel(req.body)

    if(!req.body.name || !req.body.description || !req.body.price || !req.body.lager){ 
      res.status(400).json({message: "Missing name, description, price or lager"})
      return
    } else{
      await newProduct.save()
      res.status(201).json(newProduct)
    }
  });

module.exports = router;