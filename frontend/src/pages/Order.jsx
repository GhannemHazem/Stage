import React,{useEffect} from 'react'
import { Button,Row,Col, ListGroup , Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link,useNavigate,useParams} from 'react-router-dom'
import Message from '../components/Message'
import  Loader from '../components/Loader'
import {detailorder} from '../features/orderReducer/orderaction'
const Order = () => {
   
    const dispatch =useDispatch()
    const navigate=useNavigate()
    const {id} =useParams()
    

    

    
    const orderdetails=useSelector(state => state.orderdetails)
    const {order,loading,error} = orderdetails

    const auth=useSelector(state => state.auth)
    const {user} = auth


 
    // calculate price
   if (!loading) {
    order.itemPrice = order.orderItems.reduce((acc, item)=> acc+item.price*item.qty,0)
    
   }
    
    
  

    useEffect(() => {
        if(!order || order._id !==id){
        dispatch(detailorder(id))
        
    }
    },[id,order])
    
    

  return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> :
  <>
  <h1>Order  {order._id} </h1>
  <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h2>Shipping</h2>
                   
                    <strong>Name: </strong>{user.firstName+' '+user.lastName+' '}
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                    <p>
                        <strong>Address: </strong>
                        {order.isDelivred?<Message variant='seccess'>
                        Delivred on {order.DelivredAt}</Message>:
                        <Message variant='danger'>Not Delivred</Message>}
                        {order.shippingAddress.address} ,
                        {order.shippingAddress.city} ,
                        {order.shippingAddress.postalcode} ,
                        {order.shippingAddress.country}
                    </p>
                </ListGroupItem>

                <ListGroupItem>
                    <h2>Payment Method</h2>
                    <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                    </p>
                    {order.isPaid?<Message variant='seccess'>
                        Paid on {order.paidAt}</Message>:
                        <Message variant='danger'>Not Paid</Message>}
                </ListGroupItem>
                <ListGroupItem>
                    <h2>Order Item</h2>
                    {order.orderItems.length ===0?
                    <Message>
                        Order is emty
                    </Message>:(
                        <ListGroup variant='flush'>
                            {order.orderItems.map((item,index) =>(
                                
                                <ListGroupItem key={index} >
                                  
                                    <Row>
                                        <Col md={3}>
                                            <Image src={`/${item.image}`} alt={item.name} fluid rounded></Image>
                                        </Col>
                                        <Col>
                                        <Link to={`/product/${item.product}`}>
                                        {item.name}
                                        </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x ${item.price} =${item.qty * item.price}
                                            
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                        )}
                </ListGroupItem>
            </ListGroup>

        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2>Order Summary</h2>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Items</Col>
                            <Col>${order.itemPrice}</Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Total</Col>
                            <Col>${order.TotalPrice}</Col>
                        </Row>
                    </ListGroupItem>

                </ListGroup>
            </Card>
        </Col>
    </Row>
  </>
}

export default Order
