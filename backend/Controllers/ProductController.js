const products = require('./data/product')
const asyncHandler = require('express-async-handler')

const getProducts = asyncHandler (async (req, res) => {
    const product = await products.find({})
    res.json(product)
})
const getProductId = asyncHandler (async (req, res) => {
    const product=products.find(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
        
    }
   
})
export {getProducts ,getProductId}