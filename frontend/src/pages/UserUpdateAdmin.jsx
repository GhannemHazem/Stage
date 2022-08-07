import React, {useEffect,useState } from 'react'
import { Form , Button,Col  } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import {  useNavigate,Link,useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { adminGetUser,adminUpdateUser } from '../features/auth/useraction'
import {USER_UPDATE_ADMIN_RESET} from "../features/constance/productconstance"


const UserUpdateAdmin = () => {

  const [ email , setEmail]=useState('')
  const [ firstName , setName]=useState('')
  const [ lastName , setLastName]=useState('')
  const [ phone , setPhone]=useState('')
  const [ isadmin , setIsAdmin ]=useState(false)
  const [ bloque , setBloque ]=useState(false)
  const dispatch = useDispatch() 
  const navigate=useNavigate()
  const userid = useParams().id;

  
  
  const admingetuser =useSelector(state => state.admingetuser)
const {adminUser,loading,error}=admingetuser

  const adminupdateuser = useSelector((state)=> state.adminupdateuser)
  const {success,loading: loadingupdate,error:errorupdate}  = adminupdateuser

    //adminupdateuser
  
 
    useEffect(()=>{
        if (success) {
            dispatch({type:USER_UPDATE_ADMIN_RESET})
            navigate('/admin/userlist')
        }else{
            if (!adminUser || adminUser._id !==userid ) {
                dispatch(adminGetUser(userid))
            }else{
                setBloque(adminUser.bloque)
                setName(adminUser.firstName)
                setLastName(adminUser.lastName)
                setIsAdmin(adminUser.isadmin)
                setEmail(adminUser.email)
                setPhone(adminUser.phone)
            }
        }
        
        
    },[dispatch,adminUser,success])
 
  const submitHandler =(e)=>{
    e.preventDefault()
    dispatch(adminUpdateUser({_id:userid,email,firstName,lastName,isadmin,bloque,phone}))
  }


  

  return (
  <>
  <Link to ='/admin/userlist' className='btn btn-light my-3'>go back</Link>
  
        <h2> Update User  </h2>
     {loadingupdate && <Loader />}
     {errorupdate && <Message variant='danger'>{errorupdate}</Message>}
     {loading ?<Loader></Loader> : error ? <Message variant='danger'>{error}</Message> :(
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
            phone
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
        <Form.Group controlId='isadmin'>
          <Form.Label>
           
          </Form.Label>
          <Form.Check
          type='checkbox'
          label='isAdmin'
          checked={isadmin}
          value={!isadmin}
          onChange={(e)=> setIsAdmin(e.target.value)}
          ></Form.Check>
  
        </Form.Group>
        <Form.Group controlId='bloque'>
          <Form.Label> 
          
           </Form.Label>
          <Form.Check
          type='checkbox'
          label='Bloque'
          checked={bloque}
          value={!bloque}
          onChange={(e)=> setBloque(e.target.value)}
          ></Form.Check>
  
        </Form.Group>
        <Button type='submit' variant ='primary'> Update</Button>
        </Form>
     )}
     
      
      </>
     
  )
}

export default UserUpdateAdmin