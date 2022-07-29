import { BrowserRouter as Router, Routes, Route , Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} /> 
            <Route path='/profile' element={<Profile />} /> 
            <Route path='/Dashboard' element={<Dashboard />} /> 
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<Navigate to ='/' />} /> 
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
