import { useEffect, useState } from 'react';

const jwt = require('jsonwebtoken');

const PostItem = ({post}) => {
    const [currentUser, setCurrentUser] = useState(null);
    useEffect(() => {
        setCurrentUser(jwt.decode(localStorage.getItem('user')).id);
    })

    return ( 
        <div className="PostItem">
            <div className="PostUser">
                <a href={ currentUser !== post.userId ? '/userProfile/'+post.userId : '/myProfile'}>{post.username}</a>
            </div>
            <div className="PostBody">
                <p>{post.body}</p>
            </div>
        </div>
     );
}
 
export default PostItem;