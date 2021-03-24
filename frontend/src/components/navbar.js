import { useEffect } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

 const NavBar = () => {
	const history = useHistory();

	const handleLogOut = async () => {
		try {
			await fetch('http://localhost:5000/logOut', {credentials: 'include'});
			localStorage.removeItem('user');
			history.push('/');
		} catch (error) {
			throw error;
		}
	}

	return ( 
		<Navbar bg="primary" variant="dark">
			<Navbar.Brand href="#home">Blogs</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link as={Link} to="/"> Home </Nav.Link>
				{/* { localStorage.getItem() && <Nav.Link as={Link} to="/" onClick= {handleLogOut}> Log Out </Nav.Link> } */}
			</Nav>
		</Navbar>
	);
}
 
export default NavBar;