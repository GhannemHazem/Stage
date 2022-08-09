import React, {useEffect } from 'react'
import { Button , Row , Col,Table } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { ListOrdersAdmin } from '../features/orderReducer/orderaction'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'

const OrderList = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const auth = useSelector((state)=> state.auth)
    const {user}  = auth


    const AdminOrderList =useSelector(state => state.AdminOrderList)
    const {loading,error,ordersList}=AdminOrderList



  
   
  
   
    useEffect(()=>{
        if(user.isadmin){
        dispatch(ListOrdersAdmin())
      }

    }, [ dispatch  ])

  return (
    <>
    <h1>Users</h1>

    {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message>:(
         <Table striped bordered hover responsive className='table-sm'>

         <thead>
             <tr>
                 <th>ID</th>
                 <th>User</th>
                 <th>Date</th>
                 <th>Total</th>
                 <th>Paid</th>
                 <th>Delivered</th>
                 
                 
             </tr>
         </thead >
         <tbody>
         {ordersList.map(order => (
             <tr key={order._id}>
            <tr>{order._id}</tr>
             <td>{order.user}</td>
             <td>{order.createAt.slice(0,19)}</td>
             <td>{order.TotalPrice}</td>
             <td>
                 
                 {order.isPaid? (<i className='fas fa-check' style={{color: 'green'}}></i>):
                 (<i className='fas fa-times' style={{color: 'red'}}></i>)}
             </td>
             <td>
                 
                 {order.isDelivered? (<i className='fas fa-check' style={{color: 'green'}}></i>):
                 (<i className='fas fa-times' style={{color: 'red'}}></i>)}
             </td>
             <td>
                 <LinkContainer to = {`/order/${order._id}`}>
                 <Button variant='light' className='btn-sm' >
                         Details
                     </Button>
                 </LinkContainer>
                 
                     
             </td>

             </tr>
         ))}
         

         </tbody>
     </Table>
    )}

    </>
  )
}

export default OrderList