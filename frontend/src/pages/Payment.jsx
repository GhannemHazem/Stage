import React ,{ useState  }from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {  useNavigate   } from 'react-router-dom'
import { Form ,Button, Col } from 'react-bootstrap'
import {savePayment} from '../features/shipping/shippingaction'
import CheckoutSteps from '../components/CheckoutSteps'

const Payment = () => {

    const shipping = useSelector(state=> state.shipping)
    const{shippingAdress}=shipping

    if (!shippingAdress) {
        navigate('/shipping')
        
    }

  
    const HomeCheck=() =>{
        if ( check) {
            setCheck(false)
        } else {
            setCheck(true)
            
        }
        if ( !homecheck) {
            setHomeCheck(true)
        } else {
            setHomeCheck(false)
            
        }

    }

    const [payment, setPayment]=useState('Paypal')
    const [check, setCheck]=useState(true)
    const [homecheck, setHomeCheck]=useState(false)
  

    const dispatch= useDispatch()
    const navigate=useNavigate()

    const SubmitHandler= (e) =>{
        e.preventDefault()
        dispatch(savePayment(payment))
        navigate('/placeorder')
    }
  return (
        < >
        <CheckoutSteps step1 step2 step3 />
    <h1>Payment</h1>
    <Form onSubmit={SubmitHandler}>
    <Form.Group>
        <Form.Label as='legend'>
        Select Method
        </Form.Label>
        <Col>
        <Form.Check type='radio' 
        label='Paypal or Credit Card' 
        value='Paypal' 
        name='PaymentMethod'
        id='Paypal'
        checked ={check}
        onClick = {HomeCheck}
        onChange={(e) => setPayment(e.target.value)}> 
        </Form.Check>
        <Form.Check type='radio' 
        label='HomePayment' 
        value='HomePayment' 
        name='HomePaymentMethod'
        id='HomePayment'
        checked ={homecheck}
        onClick = {HomeCheck}
        onChange={(e) => setPayment(e.target.value)}> 
        </Form.Check>

        </Col>
    </Form.Group>
      <Button  type ='submit' variant='primary'> Continue</Button>

    </Form>
    </>

  )
}

export default Payment