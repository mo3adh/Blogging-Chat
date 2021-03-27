import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const CreatePost = () => {
    const [postBody, setPostBody] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();
        try {
            await fetch(('http://localhost:5000/createPost'), {
            method: 'POST',
            body: JSON.stringify({postBody}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            });

            window.location.reload();
        } catch (error) {
            throw error;
        }
    }

    return ( 
        <div className="CreatePost">
            <Form onSubmit={handlePost}>
                <textarea placeholder='Type something ...'
                    onChange = {(e) => {
                        setPostBody(e.target.value);
                    }}

                />
                <br />
                <Button type='submit' disabled={postBody === ''} >Pots</Button>
            </Form>
            
            
        </div>
     );
}
 
export default CreatePost;