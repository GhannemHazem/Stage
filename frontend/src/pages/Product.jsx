import React ,{useEffect,useState} from 'react'
import { Link , useParams,useNavigate  } from 'react-router-dom'
import { Card ,Button, Row, Image, ListGroup, Col, ListGroupItem, FormControl } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useDispatch , useSelector } from 'react-redux'
import { listproductDetails } from '../features/productDetailReducer/productdetailaction'
const Product = () => {
  const [qty,setQty] =useState(1)
  const navigate=useNavigate()
  const {id} =useParams()
  const dispatch = useDispatch()
  const productdetail =useSelector(state =>state.productdetail )
  const{loading,error, product} = productdetail
  useEffect(() => {
    dispatch(listproductDetails(id))

  },[dispatch,id])
  const addToCartHandler =()=>{

    navigate(`/cart/${id}?qty=${qty}`)
  }

  return (
    <>
    <Link className='btn btn-dark my-4 ' to='/' >Back</Link>
    {loading ? <Loader /> : error ? <Message variant ='danger'>{error}</Message>  : 
    <Row >
      <Col md={6}>
        <Image src={'/'+product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush' >
          <ListGroupItem>
            <h2>{product.name}</h2>
          </ListGroupItem>
          <ListGroupItem>
            <Rating value= {product.rating} text = {`${product.numReviews} reviews`}/>
          </ListGroupItem>
          <ListGroupItem>
            price: ${product.price}
          </ListGroupItem>
          <ListGroupItem>
            description: {product.description}
          </ListGroupItem>
          </ListGroup>
      </Col>
      
      <Col md={3}>
      <Card>
        <ListGroupItem variant='flush'>
          <ListGroupItem>
            <Row>
              <Col>
              Price: 
              </Col>
              <Col>
              <strong>${product.price}</strong>
              </Col>
            </Row>
          </ListGroupItem>

          <ListGroupItem>
            <Row>
              <Col >
              <strong>Status: </strong>
              </Col>
              <Col >
              {product.stock >0 ?'In Stock': 'Out Of Stock'}
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroupItem>
         {product.stock >0 && (
          <ListGroupItem>
            <Row>
              <Col>Qty</Col>
              <Col>
              <FormControl as='select' value={qty} onChange={(e)=>
              setQty (e.target.value)}>{
                 [...Array(product.stock).keys()].map(x=> (
                  <option key={x+1} value ={x+1} >{x+1}</option>
                 ))}
              </FormControl>
              </Col>
            </Row>
          </ListGroupItem>
         )}
        <ListGroupItem>
            <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.stock === 0 }> Add To Cart</Button>
          </ListGroupItem>
      </Card>
      </Col>

    </Row>
    }
    </>
  )
}

export default Product