const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    user:{type: mongoose.Schema.Types.ObjectId, required: true,ref:'User'},
    taxPrice: {type: Number, required: true , default: 0.0},
    shippingPrice: {type: Number, required: true , default: 0.0},
    TotalPrice: {type: Number, required: true , default: 0.0},
    isPaid: {type: Boolean , required: true, default: false},
    paidAt: {type: Date},

    isDelivered: {type: Boolean , required: true, default: false},
    deliverddAt: {type: Date},
    orderItems: [{ 
        name: { type: String, required: true},
        qty: { type: Number, required: true},
        image: { type: String, required: true},
        price: { type: Number, required: true},
        product: {type: mongoose.Schema.Types.ObjectId, required:true,ref:'Product'},
    }],
    user: {type: String ,require: true },
    shippingAddress: {
        address:{ type: String, required:true}, 
        city:{ type: String, required:true}, 
        postalcode:{ type: String, required:true}, 
        country:{ type: String, required:true}, 
    },
    paymentMethod:{type: String, required:true},
    paymentResult:{
        id:{type: String},
        status:{type: String},
        update_time:{type: String},
        email_address:{type: String},
    },
    createAt:{type:Date,required:true,default:Date.now()}
   
})
module.exports = mongoose.model('Order', OrderSchema)
