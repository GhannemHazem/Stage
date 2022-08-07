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

const updateOrderToPaid = asyncHandler (async (req, res) => {
    
    const order = await Order.findById(req.params.id)
    
        
    if (order) {
        order.isPaid =true
        order.paidAt = Date.now()
        order.paymentResult ={
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
       
        const updatedorder = await order.save()
        res.json(updatedorder)
        
    } else {
        res.status(404)
        throw new Error('no order found')

    }
})

const userorders = asyncHandler (async (req, res) => {
    console.log(req.user._id);
    const orders = await Order.find({user: req.user._id})
    res.json(orders)
    
        
  
})
module.exports = { addorder,detailorder ,updateOrderToPaid,userorders}