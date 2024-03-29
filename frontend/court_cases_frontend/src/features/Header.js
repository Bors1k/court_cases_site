import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'


function Header (){
  const userLogin = useSelector((state)=>state.auth)

  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{"marginBottom": "10px"}}>
      <Container>
        <Navbar.Brand>
          <Link to="/" className='Link'>
          <Image
              alt="site logo"
              src="/favicon.ico"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Реестр юридических дел
            </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className='justify-content-end'>
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/courts'>Таблица дел</Nav.Link>
            <Nav.Link as={Link} to='/courts/create-court'>Создать дело</Nav.Link>
          </Nav>
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