import { createStore, combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from '../features/auth/authSlice'
import {productListReducer} from '../features/productReducer/productreducer'
import {productDetailReducer} from '../features/productDetailReducer/productdetailpreducer'
import {cartReducer} from '../features/CartReducer/cartReducer'
import {shippingReducer} from '../features/shipping/shippingReducer'
import {orderCreateReducer,orderdetailReducer} from '../features/orderReducer/orderReducer'
import { usertDetailReducer ,usertUpdateProfileReducer} from '../features/auth/userReducer'


const reducer = combineReducers({
  auth: authReducer,
  productlist: productListReducer,
  productdetail: productDetailReducer,
  cart:cartReducer,
  userinfo: usertDetailReducer,
  userupdateprofile: usertUpdateProfileReducer,
  shipping:shippingReducer,
  placeorder:orderCreateReducer,
  orderdetails: orderdetailReducer,
})

const shippingAdress =localStorage.getItem('shippingAddress')
? JSON.parse(localStorage.getItem('shippingAddress'))
: []

const cartItem =localStorage.getItem('cartItems')
? JSON.parse(localStorage.getItem('cartItems'))
: []


const initialState ={
  cart:{cartItems: cartItem},
  shipping:{shippingAdress: shippingAdress},
  
}
const middleware = [thunk]

const store = createStore(
  reducer, 
  initialState, 
  composeWithDevTools(applyMiddleware(...middleware)));

export default store