import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

 const NavBar = () => {
	const history = useHistory();

	const handleLogOut = async () => {
		try {
			await fetch('http://localhost:5000/logOut', {credentials: 'include'});
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
				<Nav.Link as={Link} to="/userProfile"> Profile </Nav.Link>
			</Nav>
			{ localStorage.getItem('user') && <Nav className='ml-auto'>
				  <Nav.Link as={Link} to="/" onClick= {handleLogOut}> Log Out </Nav.Link> 
			</Nav> }
				
		</Navbar>
	);
}
 
export default NavBar;