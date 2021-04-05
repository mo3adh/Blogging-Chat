import { useEffect, useState } from "react";
import socketIOClient  from "socket.io-client";
const ENDPOINT = 'http://127.0.0.1:4001';

const ChatRoom = () => {
    const [response, setResponse] = useState('');
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT, {transports: ['websocket']});
        socket.on("sendBack", data => {
          setResponse(data);
        });
        socket.emit('sendBack', 'Hello Again');
        return () => socket.disconnect();
      }, []);

    return (
        <div className="ChatRoom">
            <time dateTime={response}>{response}</time>
        </div>
     );
}
 
export default ChatRoom;