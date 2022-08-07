const express = require('express')
const router = express.Router()
const products = require('../Models/Product')
const { protect,isAdmin } = require('../middleware/authMiddleware')

const { getProducts, getProductId,AdminDeleteProduct } = require('../Controllers/ProductController')


router.route('/').get(getProducts)
router.route('/:id')
.get(getProductId)
.delete(protect,isAdmin,AdminDeleteProduct)



module.exports = router