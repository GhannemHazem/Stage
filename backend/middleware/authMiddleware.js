const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../Models/User')
const resettoken = require('../Models/ResetToken')
const { isValidObjectId } = require('mongoose')
const bcrypt = require('bcryptjs')

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (error) {
      console.log(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
})

const isAdmin  = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isadmin) {
    next()
  } else {
    res.status(401)
    throw new Error ('Not Authorized as an admin')
  }

})

const validator  = asyncHandler(async (req, res, next) => {
  const {token,id} = req.query
  console.log(req.query)
  if (!token || !id ){
    throw new Error(" Invalid request")
  }
  if(!isValidObjectId(id)){
    throw new Error(" Invalid User")
  }
  const user = await User.findById(id)
  if (!user){
    throw new Error("User Not Found ")
  }  
  const reset = await resettoken.findOne({ owner : user._id})
  if(!reset){
    throw new Error("reset token not found")
  }
  const isvalid= await await bcrypt.compareSync(token, reset.vtoken)
  if(!isvalid){
    throw new Error("reset token is not invalid")
  }
  req.user=user
  next()
})

module.exports = { protect ,isAdmin,validator}