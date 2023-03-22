var express = require('express');
var router = express.Router();
const orderModel = require('../models/orderModel')


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
    
    for (let i = 0; i < products.length; i++ ) {
        let element = products[i];

        if(!element.productId || !element.quantity){
        res.status(400).json({message: "Missing product id or amount"})
        return;
        }
    }

    if(!req.body.user || !req.body.products){ 
        console.log("Missing user, product or quantity");
        res.status(400).json({message: "Missing user or product"})
        return;
    } 
        const newOrder = await orderModel.create(req.body)
        res.status(201).json(newOrder)
});

module.exports = router;