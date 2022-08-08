import { createStore, combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import authReducer from '../features/auth/authSlice'
import {productListReducer,adminProductDelete,adminProductCreate,adminProductUpdtae} from '../features/productReducer/productreducer'
import {productDetailReducer} from '../features/productDetailReducer/productdetailpreducer'
import {cartReducer} from '../features/CartReducer/cartReducer'
import {shippingReducer} from '../features/shipping/shippingReducer'
import {orderCreateReducer,orderdetailReducer,orderPayReducer ,myOrderListReducer} from '../features/orderReducer/orderReducer'
import { usertDetailReducer ,usertUpdateProfileReducer,adminUserList,adminUserDelete,
  AdminGetUserReducer,AdminUpdateUserUserReducer} from '../features/auth/userReducer'


const reducer = combineReducers({
  auth: authReducer,
  userinfo: usertDetailReducer,
  userupdateprofile: usertUpdateProfileReducer,
  usersListAdmin: adminUserList,
  usersDeleteAdmin: adminUserDelete,
  admingetuser: AdminGetUserReducer,
  adminupdateuser: AdminUpdateUserUserReducer,
  productlist: productListReducer,
  productdetail: productDetailReducer,
  ProductUpdateAdmin: adminProductUpdtae,
  productDeleteAdmin: adminProductDelete,
  productcreateAdmin: adminProductCreate,
  cart: cartReducer,
  shipping: shippingReducer,
  placeorder: orderCreateReducer,
  orderdetails: orderdetailReducer,
  orderpay: orderPayReducer,
  myOrdersList: myOrderListReducer,
  

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