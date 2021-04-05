import CreatePost from "../components/cratePost";
import GetPosts from "../components/getPosts";
const jwt = require('jsonwebtoken');

const Home = () => {

    // const getCookie = (name) => {
    //     const value = `; ${document.cookie}`;
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop().split(';').shift();
    // }
    // const user = jwt.decode(getCookie('token'));
    // console.log(user);

    return ( 
        <div className="Home">
            <CreatePost />
            <GetPosts />
        </div>
        );
    
}
 
export default Home;