import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

 const NavBar = () => {
	return ( 
		<Navbar bg="primary" variant="dark">
			<Navbar.Brand href="#home">Blogs</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link as={Link} to="/"> Home </Nav.Link>
			
				<Nav.Link as={Link} to="/create"> Create Blog </Nav.Link>
			</Nav>
		</Navbar>
	);
}
 
export default NavBar;