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
import Dashboard from './pages/Dashboard'
import Shipping from './pages/Shipping'
import Payment from './pages/Payment'
import { Container } from 'react-bootstrap'

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
            <Route path='/Dashboard' element={<Dashboard />} /> 
            <Route path='/Shipping' element={<Shipping />} /> 
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
