const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUsersAdmin,
  adminDeleteUser,
  adminGetUser,
  updateUserAdmin,
  verifyEmail,
  ForgetPassword,resetpassword
} = require('../Controllers/UserController')
const { protect,isAdmin,validator } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/verify-email', verifyEmail)
router.post('/forget-password',ForgetPassword)
router.post('/reset-password',validator,resetpassword)
router.post('/login', loginUser)
router.get('/userslist', protect,isAdmin,getAllUsersAdmin)
router.route('/:id').delete(protect,isAdmin,adminDeleteUser)
.get(protect,isAdmin,adminGetUser)
.put(protect,isAdmin,updateUserAdmin)
router
.route('/profile/:id')
.get (protect, getUserProfile)
.put( protect, updateUserProfile)

module.exports = router