import {  useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { logoutinfo } from '../features/auth/useraction'
import { Container, Navbar, Nav, NavDropdown  } from 'react-bootstrap'
import { LinkContainer  } from 'react-router-bootstrap'


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  

  const onLogout = () => {
    dispatch(logoutinfo())
    dispatch(logout())
    dispatch(reset())

    navigate('/')
  }

  return (
    <header >
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
       
    
        <LinkContainer to ='/'><Navbar.Brand >Cars</Navbar.Brand></LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Nav className="ml-auto">
        <LinkContainer to='/Cart'><Nav.Link ><i className="fa-solid fa-cart-shopping"></i>Cart</Nav.Link></LinkContainer>
        
        {user ?   (
            
            <NavDropdown title={ user.lastName + user.firstName } id= 'username'>{user.name}
              <LinkContainer to='/profile'>
                <NavDropdown.Item><i className="fa-solid fa-user" ></i>
                  Profile
                </NavDropdown.Item>
                
              </LinkContainer>
              <NavDropdown.Item onClick={onLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i>logout
                </NavDropdown.Item>
                

              
            </NavDropdown>
            
            
        ) : (
          <> 
          
          <LinkContainer to='/login'><Nav.Link><i className="fa-solid fa-user" ></i>login</Nav.Link></LinkContainer>
       
          
          </>
        )}
        
          </Nav>
      
    </Container>
    </Navbar>
    </header>
  )
}

export default Header