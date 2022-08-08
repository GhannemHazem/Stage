import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Home from './pages/Home'
import Register from './pages/Register'
import Profile from './pages/Profile'
import UserUpdateAdmin from './pages/UserUpdateAdmin'
import AdminProductList from './pages/AdminProductList'
import AdminEditProduct from './pages/AdminEditProduct'
import Admin from './pages/Admin'
import Shipping from './pages/Shipping'
import PlaceOrder from './pages/PlaceOrder'
import Payment from './pages/Payment'
import { Container } from 'react-bootstrap'
import Order from './pages/Order'

function App() {
  return (
    <>
      <Router>
        
     
          <Header />
          <main className='py-4'>
          <Container>
          <Routes>
            
            <Route path='/' element={<Home /> } exact /> 
            <Route path='/profile' element={<Profile />} /> 
            <Route path='/Cart/:id' element={<Cart />} /> 
            <Route path='/Cart' element={<Cart />} /> 
            <Route path='/Order/:id' element={<Order />} /> 
            <Route path='/Admin/:id/edit' element={<UserUpdateAdmin />} /> 
            <Route path='/Admin/product/:id/edit' element={<AdminEditProduct />} /> 
            <Route path='/Admin/productlist' element={<AdminProductList />} /> 
            <Route path='/Admin/userlist' element={<Admin />} /> 
            <Route path='/Shipping' element={<Shipping />} /> 
            <Route path='/Placeorder' element={<PlaceOrder />} /> 
            <Route path='/Payment' element={<Payment />} /> 
            <Route path='/login' element={<Login />}  />
            <Route path='/register' element={<Register />} />
            <Route path='/product/:id' element={<Product />} />
           
            {/* <Route path='*' element={<Navigate to ='/' />} />  */}
          </Routes>
          {/* <Footer /> */}
        </Container>
        </main>
      </Router>
      
      <ToastContainer />
    </>
  )
}

export default App;
