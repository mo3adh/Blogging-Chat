import { useHistory } from "react-router-dom";

const UserPage = () => {
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
        <div className="User">
            <button onClick={ handleLogOut }>Log Out</button>
        </div>
        );
    
}
 
export default UserPage;