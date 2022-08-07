const express = require('express')
const router = express.Router()
const products = require('../Models/Product')
const { protect,isAdmin } = require('../middleware/authMiddleware')

const { getProducts, getProductId,AdminDeleteProduct,CreateProduct,UpdateProduct } = require('../Controllers/ProductController')


router.route('/').get(getProducts).post(protect,isAdmin,CreateProduct)
router.route('/:id')
.get(getProductId)
.delete(protect,isAdmin,AdminDeleteProduct)
.put(protect,isAdmin,UpdateProduct)




module.exports = router