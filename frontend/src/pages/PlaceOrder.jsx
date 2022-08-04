import React,{useEffect} from 'react'
import { Button,Row,Col, ListGroup , Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link,useNavigate} from 'react-router-dom'
import Message from '../components/Message'
import  CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../features/orderReducer/orderaction'
const PlaceOrder = () => {
    const shipping = useSelector(state=> state.shipping)
    const cart = useSelector(state=> state.cart)
    const dispatch =useDispatch()
    const navigate=useNavigate()
    // calculate price
    const addseconddecimal =(num) =>{
        return (Math.round(num*100) /100).toFixed(2)

    }
    cart.itemPrice= cart.cartItems.reduce((acc, item)=> acc+item.price*item.qty,0)
  
   
   cart.shippingPrice = cart.itemPrice>300 ? 0 : 20

    cart.taxPrice = addseconddecimal(Number((0.1*cart.itemPrice).toFixed(2)))
    cart.TotalPrice=(Number(cart.itemPrice)+
    Number(cart.shippingPrice)+
    Number(cart.taxPrice)).toFixed(2)

    const placeorder=useSelector(state => state.placeorder)
    const {order,success,error} = placeorder
    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`)
        } else {
            
        }

    },[navigate,success])
    const placeOrderHandler = () =>{
        dispatch(createOrder({
            orderItems: cart.cartItems,

            shippingAddress: shipping.shippingAdress,
            paymentMethod: shipping.paymentMehod,

            itemsPrice: cart.itemPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            TotalPrice: cart.TotalPrice,
        }))
    }

  return (
    <>
    <CheckoutSteps step1 step2 step3 step4 />
    <Row>
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h2>Shipping</h2>
                    <p>
                        <strong>Address: </strong>
                        {shipping.shippingAdress.address} ,
                        {shipping.shippingAdress.city} ,
                        {shipping.shippingAdress.postalcode} ,
                        {shipping.shippingAdress.country}
                    </p>
                </ListGroupItem>

                <ListGroupItem>
                    <h2>Payment Method</h2>
                    <strong>Method: </strong>
                    {shipping.paymentMehod}
                </ListGroupItem>
                <ListGroupItem>
                    <h2>Order Item</h2>
                    {cart.cartItems.length ===0?
                    <Message>
                        your cart is emty
                    </Message>:(
                        <ListGroup variant='flush'>
                            {cart.cartItems.map((item,index) =>(
                                
                                <ListGroupItem key={index} >
                                  
                                    <Row>
                                        <Col md={3}>
                                            <Image src={item.image} alt={item.name} fluid rounded></Image>
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
                            <Col>${cart.itemPrice}</Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                            <Col>Shipping</Col>
                            <Col>${cart.shippingPrice}</Col>
                        </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                        <Row>
                            <Col>Tax</Col>
                            <Col>${cart.taxPrice}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Total</Col>
                            <Col>${cart.TotalPrice}</Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        {error && <Message variant='danger'>{error}</Message>}
                    </ListGroupItem>
                            <ListGroupItem>
                                <Button type='button' className='btn-block' 
                                disabled={cart.catItems ===0}
                                onClick={placeOrderHandler}>Place Order

                                </Button>
                            </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    </>
  
  )
}

export default PlaceOrder
