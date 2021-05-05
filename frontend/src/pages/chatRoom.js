import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import GetData from "../services/getData";
const jwt = require('jsonwebtoken');

const ChatRoom = () => {
	const [chat, setChat] = useState([]);
	const [message, setMessage] = useState('');
	const socketRef = useRef();

	const user = jwt.decode(localStorage.getItem('user'));
		const {data, loading, error} = GetData('http://localhost:5000/getUserInfo/' + user.id);
		console.log(data);
	useEffect(() => {
		
		// socketRef.current = io.connect('http://localhost:4000');
		// socketRef.current.emit('login', userInfo);
		// socketRef.current.on('show clients', (clientSocketId) => {
		// 	console.log(clientSocketId);
		// });
	}, []);

	const onMessageSubmit = (e) => {
		e.preventDefault();
		// socketRef.current.emit('send message to server', {
		// 	to: 'Ahmed', from: userInfo.username, body: message
		// });
		setMessage('');
	}

	const onTextChange = (e) => {
		setMessage(e.target.value);
	}

	const renderChat = () => {
		return chat.map((element, index) => (
			<div key={index}>
				
			</div>
		))
	}

  	return (
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={message}
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