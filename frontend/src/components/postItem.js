const PostItem = ({post}) => {
    return ( 
        <div className="PostItem" key={post.id}>
            <div className="PostUser">
                <h4>{post.user}</h4>
            </div>
            <div className="PostBody">
                <p>{post.body}</p>
            </div>
        </div>
     );
}
 
export default PostItem;