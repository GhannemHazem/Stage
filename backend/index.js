const path = require('path');
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/api/config/paypal',(req,res)=> 

res.send(process.env.Paypal_ClientID))

app.use('/api/users', require('./Routes/UserRoutes'));
app.use('/api/order', require('./Routes/OrderRoutes'));
app.use('/api/products', require('./Routes/ProductRoutes'));







app.listen(port, () => console.log(`Server started on port ${port}`));