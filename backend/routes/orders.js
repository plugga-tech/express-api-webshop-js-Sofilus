var express = require('express');
var router = express.Router();
const orderModel = require('../models/orderModel')

router.post('/add', async (req, res) => {

    let products = req.body.products;
    
    for (let i = 0; i < products.length; i++ ) {
        let element = products[i];
        console.log(element.quantity)

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