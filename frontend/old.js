import { useEffect, useRef, useState } from "react";
import socketIOClient  from "socket.io-client";
const ENDPOINT = 'http://127.0.0.1:4001';

const ChatRoom = () => {
  const socket = socketIOClient(ENDPOINT, {transports: ['websocket']});
  const [response, setResponse] = useState('');
  const [messageBack, setMessageBack] = useState('');

  const name = useRef();

  useEffect(() => {
    socket.on("message", data => {
      setResponse(data);
    });
    return () => socket.disconnect();
  }, []);

    const handleSubmit = async (e) => {
      e.preventDefault();
      name.current = e.target.value;
      socket.emit('messageBack', 'name.current');
    }

  return (
    <div className="ChatRoom">
      <div >{name.current}</div>
      <form onSubmit = {handleSubmit}>
        <label>Send Message</label>
        <input type='text' required onChange={ (e) => setMessageBack(e.target.value)}/>
        <input type='submit' value='Send'/>
      </form>
    </div>
  );
}
 
export default ChatRoom;























import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const ChatRoom = () => {
  const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])

  const socketRef = useRef();

  useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:4001", {transports: ['websocket']})
			socketRef.current.on("message", ({ name, message }) => {
				setChat([ ...chat, { name, message } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

  const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
	}

  const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}

  return (
		<div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
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