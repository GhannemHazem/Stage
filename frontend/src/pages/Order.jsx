import React,{useEffect,useState} from 'react'
import axios from 'axios'
import { PayPalButton  } from 'react-paypal-button-v2'
import { Button,Row,Col, ListGroup , Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link,useNavigate,useParams} from 'react-router-dom'
import Message from '../components/Message'
import  Loader from '../components/Loader'
import {detailorder,payorder,Deliverorder} from '../features/orderReducer/orderaction'
import { ORDER_PAY_RESET , ORDER_DELIVER_RESET} from '../features/constance/productconstance'
const Order = () => {
   
    const dispatch =useDispatch()
    
    const {id} =useParams()
    
    const [sdkReady,setSdkReady] =useState(false)

    

    
    const orderdetails=useSelector(state => state.orderdetails)
    const {order,loading,error} = orderdetails 

    const orderpay=useSelector(state => state.orderpay)
    const {loading: loadingPay,success: successPay} = orderpay

    const auth=useSelector(state => state.auth)
    const {user} = auth

    const OrderDeliver=useSelector(state => state.OrderDeliver)
    const {success:successDeliver,loading:loadingDeliver } = OrderDeliver


 
    // calculate price
   if (!loading) {
    order.itemPrice = order.orderItems.reduce((acc, item)=> acc+item.price*item.qty,0)
    
   }
    
    
  

    useEffect(() => {
        const addPaypalScript =async () =>{
            const { data:clientId }= await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async =true
            script.onload=()=>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        

        if(!order || successPay || successDeliver){
          
           dispatch({type: ORDER_PAY_RESET}) 
           dispatch({type: ORDER_DELIVER_RESET})
          
        dispatch(detailorder(id))      
        }else if (!order.isPaid){
            if(!window.paypal){
            addPaypalScript()
            }else{
        
            setSdkReady(true)
            }
        }
    },[id,order,successPay,successDeliver])

    const successPaymentHandler =(paymentResult) =>{
        dispatch(payorder(id,paymentResult))

    }
    const deliverHandler=() =>{
        dispatch(Deliverorder(order))
    }
    
    

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
                        { order.isDelivered ? <Message variant='success'>
                        Delivred on {String(order.deliverddAt).slice(0,16)}</Message>:
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
                    { order.isPaid ? <Message variant='success'>
                        Paid on {String(order.paidAt).slice(0,16)}</Message>:
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
                                            <Image src={`${item.image}`} alt={item.name} fluid rounded></Image>
                                            {console.log(item.image)}
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
                    {!order.isPaid && user._id === order.user &&(
                        <ListGroupItem>
                            {loadingPay && <Loader/>}
                            {!sdkReady ? <Loader/>:(
                                <PayPalButton amount={order.TotalPrice}
                                onSuccess={successPaymentHandler}
                                />
                            )}
                        </ListGroupItem>
                    )}
                    {loadingDeliver && <Loader></Loader>}
                    {user.isadmin && order.isPaid && !order.isDelivered && (
                        <ListGroupItem>
                            <Button type='button' className ='btn btn-block' onClick={deliverHandler}>
                                Deliver
                            </Button>
                        </ListGroupItem>
                    ) }
                </ListGroup>
            </Card>
        </Col>
    </Row>
  </>
}

export default Order
