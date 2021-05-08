import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import GetMyPosts from "../components/getMyPosts";
import GetData from "../services/getData";

const jwt = require('jsonwebtoken');

const MyProfile = () => {
    const user = jwt.decode(localStorage.getItem('user'));
    const [username, setUsername] = useState(null);
    const {data} = GetData('http://localhost:5000/getUserInfo/' + user.id)

    return ( 
        <div className="MyProfile">
        <Container className='fluid'>
            <h3 className='text-center my-5'><strong>{data && data.username}</strong> Profile</h3>
            <GetMyPosts />
        </Container>
            
        </div>
     );
}
 
export default MyProfile;