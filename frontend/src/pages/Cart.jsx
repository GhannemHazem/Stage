import React ,{ useEffect   }from 'react'
import { useDispatch , useSelector } from 'react-redux'
import Message from '../components/Message'
import { Link ,useParams,useNavigate ,useSearchParams  } from 'react-router-dom'
import {Row,Col,ListGroup ,Image ,Button,Card, ListGroupItem,FormControl } from 'react-bootstrap'
import { addToCart , removeFromCart } from '../features/CartReducer/cartaction'

const Cart = () => {
  const {id} =useParams()
  const [searchParams] = useSearchParams();
  const navigate=useNavigate()

  const auth = useSelector((state)=> state.auth)
  const {user}  = auth

  
  const qty = Number(searchParams.get('qty'))
  
  const dispatch=useDispatch()
  const cart =useSelector(state => state.cart)
  const { cartItems } =cart
 
  useEffect(() => {
    
    if (id) {
      dispatch(addToCart(id,qty))
    } 
  },[dispatch,id,qty])
  const removeFromCartHandler =(id)=>{
    dispatch(removeFromCart(id))
  }
  const checkOutHandler = () =>{
    if (user) {
      navigate('/shipping')  
    } else{
      navigate('/login?redirect=/shipping')  
    }
    

  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
        <Message>
          Your'e Cart is Empty 
        <Link to='/'>Go Back</Link>
        </Message>):(
          <ListGroup variant='flush'>
            {cartItems.map(item =>(
              <ListGroupItem key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src ={'/'+item.image } alt={item.name } fluid rounded />
                    </Col >
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}> ${item.price }
                    </Col>
                    <Col md={2}>
                    <FormControl as='select' value={item.qty} onChange={(e)=>
                dispatch(addToCart(item.product,Number(e.target.value)))}>{
                 [...Array(item.stock).keys()].map(x=> (
                  <option key={x+1} value ={x+1} >{x+1}</option>
                 ))}
              </FormControl>
                    </Col>
                    <Col>
                    <Button type="button" variant='light' onClick={() =>
                    removeFromCartHandler(item.product)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                    </Col>
                  </Row>

              </ListGroupItem>

            ))}
          </ListGroup>

        )}
      </Col>
      <Col md={4}>
            <Card>
              <ListGroupItem>
                <h3>Subtotal ({cartItems.reduce((acc,item)=> acc+item.qty,0)})  items </h3>
                ${cartItems.reduce((acc,item)=> acc+item.qty*item.price,0).toFixed(2)}
              </ListGroupItem>
              <ListGroupItem>
              <Button type="button" className='btn-block' disabled={cartItems.length === 0 }
               onClick={checkOutHandler}>Check Out</Button>
              </ListGroupItem>
              </Card>          
      </Col>
      

    </Row>
  )
}

export default Cart