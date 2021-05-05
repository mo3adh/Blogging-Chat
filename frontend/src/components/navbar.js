import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import serverURL from "../enviornment";

 const NavBar = () => {
	const history = useHistory();
	const handleLogOut = async () => {
		try {
			await fetch(serverURL + '/logout', {credentials: 'include'});
			localStorage.removeItem('user');
			history.push('/');
			window.location.reload();
		} catch (error) {
			throw error;
		}
	}

	return ( 
		<Navbar bg="primary" variant="dark">
			<Navbar.Brand as={Link} to='/home'>Blogs</Navbar.Brand>
			<Nav className="mr-auto">
				<Nav.Link as={Link} to="/home"> Home </Nav.Link>
				<Nav.Link as={Link} to="/myProfile"> Profile </Nav.Link>
			</Nav>
			{ localStorage.getItem('user') && <Nav className='ml-auto'>
				  <Nav.Link as={Link} to="/" onClick= {handleLogOut}> Log Out </Nav.Link> 
			</Nav> }
				
		</Navbar>
	);
}
 
export default NavBar;