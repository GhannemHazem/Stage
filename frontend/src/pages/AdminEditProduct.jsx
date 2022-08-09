import React, {useEffect,useState } from 'react'
import { Form , Button  } from 'react-bootstrap'
import { useDispatch , useSelector } from 'react-redux'
import {  useNavigate,Link,useParams } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listproductDetails } from '../features/productDetailReducer/productdetailaction'
import { adminProductUpdate } from '../features/productReducer/productaction'
import {PRODUCT_UPDATE_RESTE} from '../features/constance/productconstance'
import axios from 'axios'



const AdminEditProduct = () => {

  const [ name , setName]=useState('')
  const [ price , setprice]=useState(0)
  const [ stock , setStock]=useState(0)
  const [ image , setImage]=useState('')
  const [ brand , setBrand ]=useState('')
  const [ category , setCategory ]=useState('')
  const [ description , setDescription ]=useState('')
  const [ uploading , setUploading ]=useState(false)

  const dispatch = useDispatch() 
  const navigate=useNavigate()
  const id = useParams().id;

  
  
    const productdetail =useSelector(state => state.productdetail)
    const {product,loading,error}=productdetail
    const ProductUpdateAdmin =useSelector(state => state.ProductUpdateAdmin)
    const {sucess,loading:loadingupdate,error:errorupdate}=ProductUpdateAdmin

    useEffect(()=>{
        if(sucess){
            dispatch({type: PRODUCT_UPDATE_RESTE})
            navigate('/admin/productlist')

        }else{
            if (!product.name || product._id !==id ) {
                dispatch(listproductDetails(id))
            }else{
                setName(product.name)
                setprice(product.price)
                setStock(product.stock)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
            }
        }
       
            
        
        
        
    },[dispatch,product,id,sucess,navigate])
 
  const submitHandler =(e)=>{
    e.preventDefault()
     dispatch(adminProductUpdate({
        _id: id,
        name,
        price,
        stock,
        image,
        brand,
        category,
        description,
     }))
  }
  
  const uploadFileHandler = async(e) =>{
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image',file)
    setUploading(true)
    try{
const config ={
  headers:{
    'Content-Type':'multipart/form-data'
  }
  }
  const {data} =  await axios.post('/api/upload',formData,config)
  
  setImage(data)
  setUploading(false)
    }catch(error){
      console.error(error)
      setUploading(false)
    }
  }
  

  return (
  <>
  <Link to ='/admin/productlist' className='btn btn-light my-3'>go back</Link>
  
        <h2> Update Product  </h2>
     {loadingupdate && <Loader></Loader>}
     {errorupdate && <Message variant='danger'>{errorupdate}</Message>}
     {loading ?<Loader></Loader> : error ? <Message variant='danger'>{error}</Message> :(
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>
            Name
          </Form.Label>
          <Form.Control
          type='name'
          placeholer='entre  name'
          value={name}
          onChange={(e)=> setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='price'>
          <Form.Label>
            Price
          </Form.Label>
          <Form.Control
          type='number'
          placeholer='entre price'
          value={price}
          onChange={(e)=> setprice(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='Stock'>
          <Form.Label>
            Stock
          </Form.Label>
          <Form.Control
          type='number'
          placeholer='entre your stock'
          value={stock}
          onChange={(e)=> setStock(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='Image'>
          <Form.Label>
            Image
          </Form.Label>
          
          
          <Form.Control type="file"
          id='image-file'
          label='Choose File'
          custom
          onChange={uploadFileHandler} />

          
          {uploading && <Loader></Loader>}


          
  
        </Form.Group>

        <Form.Group controlId='Brand'>
          <Form.Label>
            Brand
          </Form.Label>
          <Form.Control
          type='text'
          placeholer='entre Brand '
          value={brand}
          onChange={(e)=> setBrand(e.target.value)}
          ></Form.Control>
  
        </Form.Group>
        
        <Form.Group controlId='Category'>
          <Form.Label>
          Category
          </Form.Label>
          <Form.Control
          type='text'
          placeholer='entre Category '
          value={category}
          onChange={(e)=> setCategory(e.target.value)}
          ></Form.Control>
  
        </Form.Group>
 
 
        <Form.Group controlId='Description'>
          <Form.Label>
          Description
          </Form.Label>
          <Form.Control
          type='text'
          placeholer='entre Description '
          value={description}
          onChange={(e)=> setDescription(e.target.value)}
          ></Form.Control>
  
        </Form.Group>

       
       
        <Button type='submit' variant ='primary'> Update</Button>
        </Form>
     )}
     
      
      </>
     
  )
}


export default AdminEditProduct