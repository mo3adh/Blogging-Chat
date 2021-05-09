import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import io from "socket.io-client";
const jwt = require('jsonwebtoken');

const ChatRoom = () => {
	const params = useParams();
	const [chat, setChat] = useState([]);
	const [message, setMessage] = useState('');
	const socketRef = useRef();
	const user = jwt.decode(localStorage.getItem('user'));
	const [room, setRoom] = useState(null);

	const getUserInfo = async (id) => {
		try {
			const result = await fetch('http://localhost:5000/getUserInfo/' + id, {
			method: 'GET',
			credentials: "include" 
		});
			const data = await result.json();
			return data;
		} catch (error) {
			throw error;
		}
	}

	useEffect( async () => {
		const myInfo = await getUserInfo(user.id);

		socketRef.current = io.connect('http://localhost:4000');
		socketRef.current.emit('login', {id: myInfo.id, username: myInfo.username});

		//socketRef.current.on('show clients', (clientSocketId) => {});
		const room = user.id + params.id;
		setRoom(room);
		
		socketRef.current.emit('create room', {room: room, from: user.id, to: params.id});
		socketRef.current.on('invite', (room) => {
			socketRef.current.emit('join', room);
			setRoom(room);
		});

		socketRef.current.on('send message to client', (message) => {
			setChat([...chat, message]);
		});
	}, [chat]);

	const onMessageSubmit = async (e) => {
		e.preventDefault();
		const sender = await getUserInfo(user.id);

		socketRef.current.emit('send message to server', {
			to: params.id, from: sender, body: message, room: room
		});
		setMessage('');
	}

	const onTextChange = (e) => {
		setMessage(e.target.value);
	}

	const renderChat = () => {
		return chat.map((element, index) => (
			<div key={index}>
				{element.from.username} : {element.body}
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
				<button disabled = {message === ''}>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
		</div>
	);

}
 
export default ChatRoom;