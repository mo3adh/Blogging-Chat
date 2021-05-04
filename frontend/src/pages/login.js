import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
const jwt = require('jsonwebtoken');

const Login = () => {
    const history = useHistory();
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState('');
    const socketRef = useRef();
    
    useEffect(() => {
        socketRef.current = io.connect('http://localhost:4000');
    })

    const handleRegister = async (e) => {
        e.preventDefault();
        if(usernameReg && passwordReg) {
            const result = await fetch('http://localhost:5000/createUser', {
                method: 'POST',
                body: JSON.stringify({username: usernameReg, password: passwordReg}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include" 
            });
            const data = await result.json();
            history.push('/home');
            console.log(data);
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if(username && password) {
            const result = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({username, password}),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await result.json();
            if(data.token) {
                localStorage.setItem('user', data.token);
                socketRef.current.emit('login', jwt.decode(localStorage.getItem('user')));
                history.push('/home');
                window.location.reload();
            }
            else setInvalid(data.message);
        }
    }

    return ( 
        <div className='Login'>
            <h1>Registration</h1>
            <form onSubmit={ handleRegister }>
                <label>Username</label>
                <input type='text' required onChange= { (e) => {
                    setUsernameReg(e.target.value);
                }}/>
                <label>Password</label>
                <input type='password' required onChange= { (e) => {
                    setPasswordReg(e.target.value);
                }}/>
                <br />
                <input type='submit' value='Register'/>
            </form>
            <br /> <br /> <br />

            <h1>Login</h1>
            <form onSubmit={ handleLogin }>
                <label>Username</label>
                <input type='text' required onChange= { (e) => {
                    setUsername(e.target.value);
                }}/>
                <label>Password</label>
                <input type='password' required onChange= { (e) => {
                    setPassword(e.target.value);
                }}/>
                <br />
                <input type='submit' value='Login'/>
            </form>
            <br />
            <h3>{ invalid }</h3>
        </div>
    );
}
 
export default Login;