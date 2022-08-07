const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../Models/User')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { _id,firstName, email, password, lastName, phone, image } = req.body

  if (!firstName || !email || !password || !lastName || !phone || !image )  {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Check if user exists
  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  // Hash password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    firstName, // same name with req.body
    email,
    lastName,
    phone,
    image,
    password: hashedPassword, // same password but hashed
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      image: user.image,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
        _id:user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        image: user.image,
        email: user.email,
        isadmin: user.isadmin,
        token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

// Update profile
// PUT /api/user/profile
// private access
const updateUserProfile = asyncHandler(async (req, res) => {
  const { email, password, firstName , lastName ,phone ,image } = req.body

  // Check for user email
  const user = await User.findOne({  _id: req.user._id  })

        
        if (user) {
        user.firstName = req.body.firstName  || user.firstName
        user.lastName  = req.body.lastName || user.lastName
        user.phone = req.body.phone || user.phone
        user.image = req.body.image || user.image
        user.email = req.body.email || user.email
        }
        
        if (req.body.password) {
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(req.body.password, salt)
          user.password = hashedPassword || user.password
          
        }
        const updateUser = await user.save()
        res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        image: user.image,
        email: user.email,

        })
  
})

const getUserProfile =asyncHandler(async (req, res) => {
  
  const user = await User.findOne({ _id: req.user._id })

  if (user ) {
    res.json({
        
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        image: user.image,
        email: user.email,
     
    })
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})

const getAllUsersAdmin =asyncHandler(async (req, res) => {
  
  const users = await User.find({})

  if (users) {
    res.json(users)
  } else {
    res.status(404)
    throw new Error('users not found')
  }
})

const adminDeleteUser =asyncHandler(async (req, res) => {
  
  const user = await User.findById(req.params.id)


  if (user) {
    await user.remove()
    res.json({message: 'user deleted'})
  } else {
    res.status(404)
    throw new Error('user not deleted')
  }
})







const adminGetUser =asyncHandler(async (req, res) => {
  
  const user = await User.findById( req.params.id ).select('-password')

  if (user ) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('user not found')
  }
})



const updateUserAdmin = asyncHandler(async (req, res) => {
  const { email,  firstName , lastName ,phone ,image,bloque,isadmin} = req.body

  // Check for user email
  const user = await User.findById( req.params.id  )

        
        if (user) {
        user.firstName = req.body.firstName  || user.firstName
        user.lastName  = req.body.lastName || user.lastName
        user.phone = req.body.phone || user.phone
        user.image = req.body.image || user.image
        user.email = req.body.email || user.email
        user.bloque = req.body.bloque 
        user.isadmin = req.body.isadmin || user.isadmin
        }
        
        
        const updateUser = await user.save()
        res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        image: user.image,
        email: user.email,
        bloque: user.bloque,
        isadmin: user.isadmin,

        })
  
})


module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateUserProfile,
  getUserProfile,
  getAllUsersAdmin,
  adminDeleteUser,
  adminGetUser,
  updateUserAdmin
}