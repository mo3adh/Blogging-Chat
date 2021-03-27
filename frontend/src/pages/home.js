import CreatePost from "../components/cratePost";
import GetPosts from "../components/getPosts";

const Home = () => {

    return ( 
        <div className="Home">
            <CreatePost />
            <GetPosts />
        </div>
        );
    
}
 
export default Home;