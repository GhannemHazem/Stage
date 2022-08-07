const express = require('express')
const router = express.Router()
const { addorder, detailorder ,updateOrderToPaid,userorders} = require('../Controllers/OrderController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').post(protect,addorder)
router.route('/myorders').get(protect,userorders)
router.route('/:id').get(protect,detailorder)
router.route('/:id/pay').put(protect,updateOrderToPaid)

module.exports = router