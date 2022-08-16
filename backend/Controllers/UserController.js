const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../Models/User')
const { generateOTP, mailTransport } = require('./utils/mail')
const VerificationToken = require('../Models/VerificationToken')
const resetToken = require('../Models/ResetToken')
const { isValidObjectId } = require('mongoose')




// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, email, password, lastName, phone, image } = req.body

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


  const otp = generateOTP()

  
  // Create user
  const user = await User.create({
    firstName, // same name with req.body
    email,
    lastName,
    phone,
    image,
    password: hashedPassword, // same password but hashed
  })

  const Verification = await VerificationToken.create ({
    owner : user._id ,
    vtoken: otp
  })
  mailTransport().sendMail({
    from: 'hazemmega55@gmail.com',
    to: user.email,
    subject: 'verfiy your account',
    html: `<h1>${otp}</h1>`
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

const verifyEmail = asyncHandler(async (req, res) => {
  const { id,otp} = req.body
  if (!id || !otp.trim()){
    res.status(406)
    throw new Error('Invalid request')
  }
  if (!isValidObjectId(id)){
    res.status(404)
    throw new Error('Invalid user')
  }
  const user = await User.findById(id)
  if(!user){
    res.status(404)
    throw new Error(' user not found')
  }
  if(user.verify){
    res.status(404)
    throw new Error(' user already verified!')
  }
  const token = await VerificationToken.findOne({owner: user._id})
  if(!token){
    res.status(404)
    throw new Error(' user anot found!')
  }
  const isMatched = await bcrypt.compareSync(otp, token.vtoken)
  if(!isMatched){
    res.status(404)
    throw new Error(' Invalid token!')
  }
  user.verify = true
  await VerificationToken.findByIdAndDelete(token._id)
  await user.save()
  

  mailTransport().sendMail({
    from: 'hazemmega55@gmail.com',
    to: user.email,
    subject: 'account verified',
    html: `<h1>account verified</h1>`
  })
  res.json('youre email is verified')
})



const ForgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body
  if (!email){
    res.status(401)
    res.json('Invalid email')
  }
  const user = await User.findOne({email: email })
  if (!user){
    res.status(401)
    res.json('User  email Invalid')
  }
  const token = await resetToken.findOne({owner: user._id})
  if(!token){
    res.status(401)
    res.json('Only 1h to request another reset password')
  }
  const reset = generateOTP()
  const resettoken = new resetToken({owner: user._id, vtoken: reset})
  await resettoken.save()

  mailTransport().sendMail({
    from: 'security@gmail.com',
    to: user.email,
    subject: 'password reset',
    html: `http://localhost:3000/reset-password?token=${reset}&id=${user._id}`

  })
res.json ('reset password sent with success to youre mail')
        
})
const resetpassword = asyncHandler(async (req, res) => {
  const {password} =req.body
  const user = await User.findById(req.user._id)
  if (!user) {
    throw new Error('User not found')
  }
  if (password.trim().length < 8 ||password.trim().length > 20){
    throw new Error('password must be 8 characters at least')
  }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    user.password = hashedPassword
    await user.save()
    const reset = await resetToken.remove(({owner: user._id}))
    console.log('reset: '+reset) 
    console.log(await resetToken.find({owner:user._id})) 
    mailTransport().sendMail({
      from: 'hazemmega55@gmail.com',
      to: user.email,
      subject: 'password changed',
      html: `<h1>password changed</h1>`
    })
    

    res.json('password reset successfully ')
})


module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  getAllUsersAdmin,
  adminDeleteUser,
  adminGetUser,
  updateUserAdmin,
  verifyEmail,
  ForgetPassword,
  resetpassword
}