const express = require('express')
const router = express.Router()
const { addorder, detailorder ,updateOrderToPaid,userorders,getAllOrdersAdmin,updateOrderToDelivered} = require('../Controllers/OrderController')
const { protect,isAdmin } = require('../middleware/authMiddleware')


router.route('/').post(protect,addorder).get(protect,isAdmin,getAllOrdersAdmin)
router.route('/myorders').get(protect,userorders)
router.route('/:id').get(protect,detailorder)
router.route('/:id/pay').put(protect,updateOrderToPaid)
router.route('/:id/deliver').put(protect,isAdmin,updateOrderToDelivered)

module.exports = router