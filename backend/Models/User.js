const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    isadmin: {type: Boolean , required: true, default:false},
    email: {type: String , required: true , unique: true} ,
    firstName: {type: String , required: true},
    password: {type: String , required: true}, // make password unreachable by add select: false
    lastName: {type: String , required: true},
    phone: {type: String ,require: true },
    image: {type: String },
    createdAt: {type: Date , default: Date.now}
})
module.exports = mongoose.model('User', UserSchema)