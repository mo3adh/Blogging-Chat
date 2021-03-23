import { useState } from "react";
import { useHistory } from "react-router-dom";

const Home = () => {
    const history = useHistory();
    const [usernameReg, setUsernameReg] = useState('');
    const [passwordReg, setPasswordReg] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState('');

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
            history.push('/user');
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
                credentials: "include"
            });
            const data = await result.json();
            // console.log(data[0]);
            if(data[0]) {
                localStorage.setItem('user', JSON.stringify(data[0]));
                history.push('/user');
            }
            else setInvalid(data.message);
        }
    }

    return ( 
        <div className='Home'>
            <h1>Registration</h1>
            <form>
                <label>Username</label>
                <input type='text' required onChange= { (e) => {
                    setUsernameReg(e.target.value);
                }}/>
                <label>Password</label>
                <input type='password' required onChange= { (e) => {
                    setPasswordReg(e.target.value);
                }}/>
                <br />
                <input type='submit' value='Register' onClick={ handleRegister }/>
            </form>
            <br /> <br /> <br />

            <h1>Login</h1>
            <form>
                <label>Username</label>
                <input type='text' required onChange= { (e) => {
                    setUsername(e.target.value);
                }}/>
                <label>Password</label>
                <input type='password' required onChange= { (e) => {
                    setPassword(e.target.value);
                }}/>
                <br />
                <input type='submit' value='Login' onClick={ handleLogin }/>
            </form>
            <br />
            <h3>{ invalid }</h3>
        </div>
    );
}
 
export default Home;