var express = require('express');
var router = express.Router();
const orderModel = require('../models/orderModel');
const productModel = require('../models/productModel');
const { ObjectId } = require("mongodb");


/*Get orders*/
router.get('/all', async (req, res) => {
    const orders = await orderModel.find()
    
    if(orders.length === 0){
      res.status(404).json({message:"Can't get users or no users to get"})
    } else {
      res.status(200).json(orders)
    }
  });

/*Add new order*/
router.post('/add', async (req, res) => {

    let products = req.body.products;
    productsToSave = []

    for (let i = 0; i < products.length; i++ ) {
        
        let element = products[i];

        if(element.quantity > 0){
          productsToSave.push(element)
        }

        if(!element.productId){
        res.status(400).json({message: "Missing product id or amount"})
        return;
        }
    }

      if(!req.body.user || !req.body.products){ 
          res.status(400).json({message: "Missing user or product"})
          return;
      } 

    for (let i = 0; i < products.length; i++ ){
      let allProductsId = products[i].productId
      const updateProductLager = await productModel.findOne({"_id": new ObjectId(allProductsId)})
       
      updateProductLager.lager -= products[i].quantity

      await updateProductLager.save() 
    }

    if(productsToSave.length === 0){
      res.status(400).json({message: "Missing pruducts"});
      return;
    }

    saveOrder = {user: req.body.user, products: productsToSave}
    const newOrder = new orderModel(saveOrder)
    console.log(newOrder)
    await newOrder.save()

    res.status(201).json(newOrder)
 });


module.exports = router;