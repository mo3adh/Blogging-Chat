import { useEffect } from "react";
import GetData from "../services/getData";
import PostItem from "./postItem";

const jwt = require('jsonwebtoken');

const GetMyPosts = () => {
    const user = jwt.decode(localStorage.getItem('user'));

    const {data} = GetData('http://localhost:5000/getUserInfo/' + user.id);
  

    return ( 
        <div className="GetMyPosts">
            {data && data.posts.map((post) => (
                <PostItem post={post} key={post.id} />
            ))}
        </div>
     );
}

export default GetMyPosts;
