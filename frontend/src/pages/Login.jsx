import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { Link,useNavigate, useSearchParams } from 'react-router-dom'

import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Loader from '../components/Loader'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  
  
  const [searchParams] = useSearchParams();

  

  useEffect(() => {
    
    const redirect = String(searchParams.get('redirect'))
    if (isError) {
      toast.error(message)
    }

    if ((isSuccess || user) ) {
      navigate('/') 
      if (redirect === '/shipping'){
        navigate(redirect)
      }
    }
    
    dispatch(reset())
  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    //check if he is banned
    dispatch(login(userData))
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login </p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block' >
              Submit
            </button>


            <h7> if you don't have an account <Link to ='/register'>register</Link> now </h7>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login