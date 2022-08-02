const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();

const products = require('./data/product');

const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./Routes/UserRoutes'));

app.get('/api/products' ,(req,res)=> {
   
    res.json(products)
})
app.get('/api/product/:id' ,(req,res)=> {
    const product=products.find((p)=>p._id === req.params.id)
    res.json(product)
    
})


app.listen(port, () => console.log(`Server started on port ${port}`));