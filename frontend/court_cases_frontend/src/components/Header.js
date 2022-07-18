import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Route, Link, useNavigate } from "react-router-dom";
import LoginScreen from '../screens/LoginScreen';

function Header (){
  const userLogin = useSelector((state)=>state.auth)

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand><Link to="/">Реестр юридических дел</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {userLogin.fio ? (
                            <Navbar.Text>
                            Авторизован как: <Link to="/profile">{userLogin.fio}</Link>
                        </Navbar.Text>
          ):(
            <Navbar.Text>
                        <Link to="/login">Авторизоваться</Link>
            </Navbar.Text>
          )
        }
        </Navbar.Collapse>
      </Container>
    </Navbar>
        );
}
 
export default Header;