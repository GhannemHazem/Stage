const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const Product = require( './Models/Product.js')
const Order = require('./Models/Order.js')
const products = require( './data/product.js')
const users = require( './data/users.js')
const User = require( './Models/User.js')

const connectDB =require( './config/db.js')



connectDB()

const importData =async () =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        
        const createusers = await User.insertMany(users)
        const admin = createusers[0]._id

        const sampleProducts = products.map(product =>{
            return {...product, user: admin}
        })

        await Product.insertMany(sampleProducts)
        console.log('Data Imported');
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}
const destroyData =async () =>{
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroy');
        process.exit()
    } catch (error) {
        console.log(error);
        process.exit(1)

    }
}
if (process.argv[2] === '-d') {
    destroyData()  
}else{
    importData();
}