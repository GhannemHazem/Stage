const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
  getUserProfile,
  updateUserProfile,
} = require('../Controllers/UserController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router
.route('/profile')
.get (protect, getUserProfile)
.put( protect, updateUserProfile)

module.exports = router