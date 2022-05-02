import { loginUser, signupUser } from './../api/AuthService';
import './../styles/auth.css';
import { useState } from 'react';
import {BiArrowBack} from "react-icons/bi";
const Auth = ({setIsLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginPage, setIsLoginPage] = useState(true);
    const [mail, setMail] = useState('');

    const handleLogin = (e) => {
        const login = {
            username: username,
            password: password
        };
        loginUser(login).then(()=>setIsLogin(true), error => {
            console.log(error);
        });
    }

    const handleSignup = (e) => {
        const signupRequest = {
            username: username,
            password: password,
            mail: mail
        };
        signupUser(signupRequest).then(()=>setIsLoginPage(true), error => {
            console.log(error);
        });
    };

    const switchPage = (e) => {
        setIsLoginPage(!isLoginPage);
    }

    return (
        <div className='container'>
        <div className="auth-page">
            {isLoginPage && <div className="login-container">
                <input className="login" type="text" placeholder="Enter login" onChange={e=>setUsername(e.target.value)}></input>
                <input className="password" type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)}></input>
                <div className="forgot-password-container">
                    <a className="forgot-password" href="localhost">Forgot password?</a>
                </div>
                <button className="login-btn" onClick={handleLogin}>Login</button>
                <button className="signup-btn" onClick={switchPage}>Signup</button>
            </div>}
            {!isLoginPage && <div className="signup-container">
                <BiArrowBack className="back" onClick={switchPage}/>
                <input className="login-signup" type="text" placeholder="Enter login" onChange={e=>setUsername(e.target.value)}></input>
                <input className="password-signup" type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)}></input>
                <input className="password-signup" type="password" placeholder="Repeat password" onChange={e=>setPassword(e.target.value)}></input>
                <input className="mail" type="mail" placeholder="Enter mail" onChange={e=>setMail(e.target.value)}></input>
                <button className="signup-signup-btn" onClick={handleSignup}>Signup</button>
            
            </div>

            }
        </div>
        </div>
    );
};

export default Auth;