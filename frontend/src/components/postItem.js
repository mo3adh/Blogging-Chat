const PostItem = ({post}) => {
    const handleClick = (e) => {
        e.preventDefault();
        console.log(post.userId);
    }

    return ( 
        <div className="PostItem">
            <div className="PostUser">
                <a href='#' onClick={handleClick}> <h4>{post.username}</h4> </a>
            </div>
            <div className="PostBody">
                <p>{post.body}</p>
            </div>
        </div>
     );
}
 
export default PostItem;