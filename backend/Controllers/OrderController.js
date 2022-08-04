const Order = require('../Models/Order.js')
const User = require('../Models/User.js')
const asyncHandler = require('express-async-handler')

const addorder = asyncHandler (async (req, res) => {
    const{ orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        shippingPrice,
        TotalPrice,
        taxPrice,
    }= req.body

    if (orderItems && orderItems ===0) {
        res.status(400)
        throw new Error('No order items')
        return   
    }else{
       const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemPrice,
        shippingPrice,
        TotalPrice,
        taxPrice,
       }) 
       const createOrder = await order.save()
       res.status(201).json(createOrder)
    }
})

const detailorder = asyncHandler (async (req, res) => {
    console.log(req.params.id);
    const order = await Order.findById(req.params.id).populate(
        'user')
        //const user =await User.findById(order.user)
        
    if (order) {
        res.json(order)
        
    } else {
        res.status(404)
        throw new Error('no order found')

    }
})
module.exports = { addorder,detailorder }