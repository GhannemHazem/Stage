import React, {useEffect,useState } from 'react'
import { Form , Button , Row , Col } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { UserDetails ,UpdateUserProfile } from '../features/auth/useraction'

const Profile = () => {

  const [ email , setEmail]=useState('')
  const [ firstName , setName]=useState('')
  const [ lastName , setLastName]=useState('')
  const [ phone , setPhone]=useState('')
  const [ password , setPassword ]=useState('')
  const [ message , setMessage ]=useState('')
  const [ confirmPassword , setConfirmPassword ]=useState('')
  const navigate=useNavigate()
  const dispatch = useDispatch() 
  
  const userinfo = useSelector((state)=> state.userinfo)
  const {loading ,error,userInfo}  = userinfo

  const auth = useSelector((state)=> state.auth)
  const {user}  = auth

  const userupdateprofile = useSelector((state)=> state.userupdateprofile)
  const {sucess}  = userupdateprofile


  
  useEffect(()=>{
    if (!user) {
      navigate('/')
    }else{

      if (!userInfo.email) {
        dispatch(UserDetails('profile'))
        
      }else{
        setName(user.firstName)
        setLastName(user.lastName)
        setEmail(user.email)
        setPhone(user.phone)
      }

    }


  },[dispatch,user,userInfo])
  const submitHandler =(e)=>{
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage ('password do not match')
      
    } else {
      dispatch(UpdateUserProfile({ id: user._id,email,password,firstName,lastName,phone}))
      
    }
    
  }
  

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile </h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {sucess && <Message variant='success'>Profile Updated</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
        <Form.Label>
          Name
        </Form.Label>
        <Form.Control
        type='name'
        placeholer='entre first name'
        value={firstName}
        onChange={(e)=> setName(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='lastname'>
        <Form.Label>
          lastName
        </Form.Label>
        <Form.Control
        type='lastname'
        placeholer='entre first lastname'
        value={lastName}
        onChange={(e)=> setLastName(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='phone'>
        <Form.Label>
          Name
        </Form.Label>
        <Form.Control
        type='phone'
        placeholer='entre your phone number'
        value={phone}
        onChange={(e)=> setPhone(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId='email'>
        <Form.Label>
          Email
        </Form.Label>
        <Form.Control
        type='email'
        placeholer='entre email'
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        ></Form.Control>

      </Form.Group>
      <Form.Group controlId='password'>
        <Form.Label>
          Password
        </Form.Label>
        <Form.Control
        type='password'
        placeholer='entre password'
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        ></Form.Control>

      </Form.Group>
      <Form.Group controlId='confirmPassword'>
        <Form.Label>
        Confirm Password
        </Form.Label>
        <Form.Control
        type='Password'
        placeholer='Confirm Password'
        value={confirmPassword}
        onChange={(e)=> setConfirmPassword(e.target.value)}
        ></Form.Control>

      </Form.Group>
      <Button type='submit' variant ='primary'> Update</Button>
      </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
     
  )
}

export default Profile