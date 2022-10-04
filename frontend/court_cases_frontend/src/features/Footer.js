import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'


function Footer (){

  return (<footer className='mt-auto'>
    <Link to={'/whats-new'}>Реестр юридических дел v 1.0.2</Link> <span> © ОИС 2021 - {new Date().getFullYear()}</span>
  </footer>);
}
 
export default Footer;