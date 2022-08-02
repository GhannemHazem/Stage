import React from 'react'
import { Row , Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import { useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {listproducts} from '../features/productReducer/productaction'
import Loader from '../components/Loader'
const Home = () => {


  const dispatch=useDispatch()
  const productlist = useSelector(state => state.productlist)
  const{ loading,error,products }= productlist

  useEffect(()=>{

    dispatch(listproducts())

  },[dispatch])

  return (
    <>
  
  <h1>Home</h1>
  {loading ?  <Loader />
   : error ? 
   <Message variant='danger'>{error}</Message>
  : <Row>
  {products.map(product => (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product product={product} />
      </Col>

    ))}

  </Row>
  }
    </>
      
  )
}

export default Home
