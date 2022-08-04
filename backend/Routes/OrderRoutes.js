const express = require('express')
const router = express.Router()
const { addorder, detailorder } = require('../Controllers/OrderController')
const { protect } = require('../middleware/authMiddleware')


router.route('/').post(protect,addorder)
router.route('/:id').get(protect,detailorder)

module.exports = router