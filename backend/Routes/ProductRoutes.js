const express = require('express')
const router = express.Router()
const products = require('../Models/Product')

const { getProducts, getProductId } = require('../Controllers/ProductController')


router.route('/').get(getProducts)
router.route('/:id').get(getProductId)



module.exports = router