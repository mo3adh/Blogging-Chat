import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const ChatRoom = () => {
	const [chat, setChat] = useState([]);
	const [state, setState] = useState({name: "", message: ""});
	const socketRef = useRef();

	useEffect(() => {
		socketRef.current = io.connect('http://localhost:4000');
		socketRef.current.on('message', ({name, message}) => {
			setChat([...chat, {name, message}]);
		});
		socketRef.current.on('private message', () => {
			console.log('new private message');
		})
		return () => socketRef.current.disconnect();
	}, [chat]);

	const onMessageSubmit = (e) => {
		e.preventDefault();
		// socketRef.current.emit('message', (state));
		// setState({name: "", message: ""});
		socketRef.current.emit('private message');
	}

	const onTextChange = (e) => {
		setState({...state, [e.target.name]: e.target.value});
	}

	const renderChat = () => {
		return chat.map(({name, message}, index) => (
			<div key={index}>
				{name} : {message}
			</div>
		))
	}

  	return (
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField 
						name="name"
						onChange={(e) => onTextChange(e)}
						value={state.name}
						label="Name"
					/>
				</div>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
		</div>
	);

}
 
export default ChatRoom;