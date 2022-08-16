import React, {useEffect } from 'react'
import { Button , Row , Col,Table } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listproducts ,adminProductDelete,adminProductCreate} from '../features/productReducer/productaction'
import { LinkContainer } from 'react-router-bootstrap'
import {PRODUCT_CREATE_RESTE} from '../features/constance/productconstance'

const AdminProductList = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()


    const auth = useSelector((state)=> state.auth)
    const {user}  = auth


    const productlist =useSelector(state => state.productlist)
    const {loading,error,products}=productlist

    const productDeleteAdmin =useSelector(state => state.productDeleteAdmin)
    const {sucess , loading:loadingproductdelete,error:errorproductdelete}=productDeleteAdmin
    
    
    const productcreateAdmin =useSelector(state => state.productcreateAdmin)
    const {sucess:successCreated , loading:loadingproductcreate,error:errorproductcreate,createproduct}=productcreateAdmin

    useEffect(()=>{
        dispatch({type: PRODUCT_CREATE_RESTE})
        if (!user.isadmin) {
            navigate('/login') 
        }
        if(successCreated){
            navigate(`/admin/product/${createproduct._id}/edit`)
        }else{
            
            dispatch(listproducts())
        }

       
    }, [ dispatch,
        navigate,
        sucess,
        user,
        successCreated,
        createproduct  ])

    const deleteHandler= (id) => {
        if (window.confirm('Are you sure')) {
        dispatch(adminProductDelete(id))
        }
    }
    const createProductHandler =(product)=> {
        dispatch(adminProductCreate())
    }

  return (
    <>
    <Row className= 'text-right'>
        <Col>
        <h1>Products</h1>
        <h4>You got {!loading ? products.length: ''} Product</h4>
        </Col>
        <Col className= 'text-right'>
            <Button className= 'my-3' onClick={createProductHandler}>
                <i className= 'fas fa-plus'></i>
                Create ProductList
            </Button>
        </Col>
    </Row>

    {loadingproductdelete && <Loader></Loader>}
    {errorproductdelete && <Message variant='danger'>{errorproductdelete}</Message>}
    {loadingproductcreate && <Loader></Loader>}

    {errorproductcreate && <Message variant='danger'>{errorproductcreate}</Message>}
    {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message>:(
         <Table striped bordered hover responsive className='table-sm'>

         <thead>
             <tr>
                 <th>ID</th>
                 <th>Name</th>
                 <th>Price</th>
                 <th>Category</th>
                 <th>Brand</th>
                 <th>stock</th>
                 
                 
             </tr>
         </thead >
         <tbody>
         {products.map(product => (
             <tr key={product._id}>
             <tr>{product._id}</tr>
             <td>{product.name}</td>
             <td>${product.price}</td>
             <td>{product.category}</td>
             <td>{product.brand}</td>
             <td>{product.stock}</td>
           
             <td>
                 <LinkContainer to = {`/admin/product/${product._id}/edit`}>
                 <Button variant='light' className='btn-sm' >
                         <i className='fas fa-edit'></i>
                     </Button>
                 </LinkContainer>
                 <Button variant='danger' 
                     className='btn-sm' 
                     onClick={()=>deleteHandler(product._id)
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



export default AdminProductList