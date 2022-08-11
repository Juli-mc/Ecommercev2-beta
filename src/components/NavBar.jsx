import React, { useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Button, Offcanvas } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import PourchasesSidebar from './PurchasesSidebar';

const NavBar = () => {

  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)
  const logOut = () => {
    localStorage.setItem("token", "")
    navigate("/login")
  }


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#/">Ecommerce</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/#/">Home</Nav.Link>
              { token && <Nav.Link href="/#/Purchases">Purchases</Nav.Link>}
              {
                token ? (<Nav.Link as={Button} onClick={logOut} className='logout'>Log out</Nav.Link>
                )
                  : (<Nav.Link href="/#/Login">Login</Nav.Link>)
              }
              <Nav.Link as={Button} onClick={handleShow}><i class="fa-solid fa-cart-shopping"></i></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <PourchasesSidebar show={show} handleClose={handleClose} handleShow={handleShow} token={token} />
    </>
  );
};

export default NavBar;