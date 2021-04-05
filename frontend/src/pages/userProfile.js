import { useParams } from "react-router";
import PostItem from "../components/postItem";
import serverURL from "../enviornment";
import GetData from "../services/getData";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import 'font-awesome/css/font-awesome.min.css';

const UserProfile = () => {
    const id = useParams();

    const {data} = GetData(serverURL + '/getUserInfo/' + id.id);

    const contactUser = () => {
        console.log("Hello");
    }

    return ( 
        <div className=" container-fluid my-4">
        { data && <div className="UserHeader">
            <h4 className='text-center'>{data.username} Profile</h4>
            <FontAwesomeIcon icon={faEnvelope}  onClick={ contactUser } cursor='pointer'/>
            
        </div> }
            { data && (data.posts).map(post => (
                <PostItem key={post.id} post={post}/>
            ))}

        </div>
    );
}
 
export default UserProfile;