import { useEffect, useState } from "react";
import PostItem from "./postItem";

const GetPosts = () => {
    const [posts, setPosts] = useState(null);

    const getAllPosts = async () => {
        try {
            const result = await fetch('http://localhost:5000/getPosts', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await result.json();
            setPosts(data);
        } catch (error) {
            throw error;
        }
    }

    useEffect(getAllPosts);

    return ( 
        <div className="GetPosts">
            {posts && posts.map((post) => (
                <PostItem post={post} />
            ))}
        </div>
     );
}
 
export default GetPosts;