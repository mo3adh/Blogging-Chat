import GetData from "../services/getData";
import PostItem from "./postItem";

const GetMyPosts = () => {

    const {data : posts , loading, err} = GetData('http://localhost:5000/myPosts');

    return ( 
        <div className="GetMyPosts">
            {posts && posts.map((post) => (
                <PostItem post={post} key={post.id} />
            ))}
        </div>
     );
}

export default GetMyPosts;
