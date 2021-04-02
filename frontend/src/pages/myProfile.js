import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import GetMyPosts from "../components/getMyPosts";

const UserProfile = () => {
    const [username, setUsername] = useState(null);
    const getData = async () => {
        try {
            const result = await fetch('http://localhost:5000/getInfo', {
                credentials: 'include'
            });
            const data = await result.json();
            setUsername(data.username);
        } catch (error) {
            throw error;
        }
    }
    useEffect(getData);

    return ( 
        <div className="UserProfile">
        <Container className='fluid'>
            <h3 className='text-center my-5'>My Profile</h3>
            <GetMyPosts />
        </Container>
            
        </div>
     );
}
 
export default UserProfile;