import React, {useEffect } from 'react'
import { Button , Row , Col,Table } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { adminUserList,adminUserDelete,adminGetUser } from '../features/auth/useraction'
import { LinkContainer } from 'react-router-bootstrap'

const Admin = () => {
    const dispatch=useDispatch()


    const userinfo = useSelector((state)=> state.userinfo)
    const {loading:loadinguserinfo ,error:erroruserinfo,userInfo}  = userinfo


    const usersListAdmin =useSelector(state => state.usersListAdmin)
    const {loading,error,userslist}=usersListAdmin

    const usersDeleteAdmin =useSelector(state => state.usersDeleteAdmin)
    const {success: successDelete}=usersDeleteAdmin

  
    

  
   
    useEffect(()=>{

        dispatch(adminUserList())

    }, [ dispatch ,successDelete ])

    const deleteHandler= (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(adminUserDelete(id))
            dispatch(adminUserList())
        }
        
        
    }

  return (
    <>
    <h1>Users</h1>

    {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message>:(
         <Table striped bordered hover responsive className='table-sm'>

         <thead>
             <tr>
                 <th>ID</th>
                 <th>FirstName</th>
                 <th>LastName</th>
                 <th>Email</th>
                 <th>Phone</th>
                 <th>Admin</th>
                 
                 
             </tr>
         </thead >
         <tbody>
         {userslist.map(user => (
             <tr key={user._id}>
            <tr>{user._id}</tr>
             <td>{user.firstName}</td>
             <td>{user.lastName}</td>
             <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
             <td>{user.phone}</td>
             <td>
                 
                 {user.isadmin? (<i className='fas fa-check' style={{color: 'green'}}></i>):
                 (<i className='fas fa-times' style={{color: 'red'}}></i>)}
             </td>
             <td>
                 <LinkContainer to = {`/admin/${user._id}/edit`}>
                 <Button variant='light' className='btn-sm' onClick={() => {dispatch(adminGetUser(user._id))}}>
                         <i className='fas fa-edit'></i>
                     </Button>
                 </LinkContainer>
                 <Button variant='danger' 
                     className='btn-sm' 
                     onClick={()=>deleteHandler(user._id)
                     }>
                         <i className='fas fa-trash'></i>
                     </Button>
                     
             </td>

             </tr>
         ))}
         

         </tbody>
     </Table>
    )}

    </>
  )
}

export default Admin