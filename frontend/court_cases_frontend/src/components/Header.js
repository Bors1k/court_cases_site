import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import LoginScreen from '../screens/LoginScreen';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useEffect } from 'react';

function Header (){
  const userLogin = useSelector((state)=>state.auth)

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{"marginBottom": "10px"}}>
      <Container>
        <Navbar.Brand><Link to="/" className='Link'>Реестр юридических дел</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Nav className="me-auto">
            <Nav.Item><Link to="/courts" className='Link'>Список дел</Link></Nav.Item>
          </Nav>
          <Navbar.Collapse className='justify-content-end'>
            {userLogin.fio ? (
              <NavDropdown title={userLogin.fio}>
                <NavDropdown.Item as={Link} to='/profile' style={{'textDecoration': 'none', 'color': 'black'}}>Профиль</NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/courts' style={{'textDecoration': 'none', 'color': 'black'}}>Таблица дел</NavDropdown.Item>
                <NavDropdown.Divider/>
                <NavDropdown.Item as={Link} to='/logout' style={{'textDecoration': 'none', 'color': 'red'}}>Выход</NavDropdown.Item>
            </NavDropdown>
            ):(
              <Navbar.Text>
                          <Link to="/login">Авторизоваться</Link>
              </Navbar.Text>
            )
          }
          </Navbar.Collapse>
      </Container>
    </Navbar>);
}
 
export default Header;