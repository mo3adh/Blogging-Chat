import { useParams } from "react-router";
import serverURL from "../enviornment";
import GetData from "../services/getData";

const UserProfile = () => {
    const id = useParams();

    const {data} = GetData(serverURL + '/getUserInfo/' + id.id);

    return ( 
        <div className="UserProfile container my-5">
            { data && <h4>{data.username} Profile</h4>}
            { data && (data.posts).map(post => (
                <li>{post.body}</li>
            ))}

        </div>
    );
}
 
export default UserProfile;