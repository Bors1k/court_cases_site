import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header (){
return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Реестр юридических дел</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
          </Nav> */}
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Авторизован как: <a href="#profile">Новиков М.А.</a>
                </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
        );
}
 
export default Header;