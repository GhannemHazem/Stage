import React ,{ useState  }from 'react'
import { useDispatch , useSelector } from 'react-redux'
import {  useNavigate   } from 'react-router-dom'
import { Form ,Button } from 'react-bootstrap'
import {saveShippingAddress} from '../features/shipping/shippingaction'
import CheckoutSteps from '../components/CheckoutSteps'
const Shipping = () => {

    const shipping = useSelector(state=> state.shipping)
    const{shippingAdress}=shipping

    

    const [address, setAddress]=useState(shippingAdress.address)
    const [city, setCity]=useState(shippingAdress.city)
    const [postalcode, setPostalCode]=useState(shippingAdress.postalcode)
    const [country, setCountry]=useState(shippingAdress.country)

    const dispatch= useDispatch()
    const navigate=useNavigate()

    const SubmitHandler= (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address,city,postalcode,country}))
        navigate('/payment')
    }
  return (
        < >
        <CheckoutSteps step1 step2  />
    <h1>Shipping</h1>
    <Form onSubmit={SubmitHandler}>
    <Form.Group controlId='address'>
        <Form.Label>
          Address
        </Form.Label>
        <Form.Control
        type='text'
        placeholer='entre your address'
        value={address}
        required
        onChange={(e)=> setAddress(e.target.value)}
        ></Form.Control>
      </Form.Group>
    <Form.Group controlId='city'>
        <Form.Label>
          City
        </Form.Label>
        <Form.Control
        type='text'
        placeholer='entre your city'
        value={city}
        required
        onChange={(e)=> setCity(e.target.value)}
        ></Form.Control>
        </Form.Group>

    <Form.Group controlId='PostalCode'>
        <Form.Label>
          PostalCode
        </Form.Label>
        <Form.Control
        type='text'
        placeholer='entre your PostalCode'
        value={postalcode}
        required
        onChange={(e)=> setPostalCode(e.target.value)}
        ></Form.Control>
      </Form.Group>

    <Form.Group controlId='Country'>
        <Form.Label>
          Country
        </Form.Label>
        <Form.Control
        type='text'
        placeholer='entre your Country'
        value={country}
        required
        onChange={(e)=> setCountry(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button  type ='submit' variant='primary'> Continue</Button>

    </Form>
    </>

  )
}

export default Shipping