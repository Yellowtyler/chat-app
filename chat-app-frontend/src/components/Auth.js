import { loginUser } from './../api/AuthService';
import { useState } from 'react';

const Auth = ({setIsLogin}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginPage, setIsLoginPage] = useState(true);

    const handleLogin = (e) => {
        const login = {
            username: username,
            password: password
        };
        loginUser(login)
        if (localStorage.getItem("accessToken") !== undefined) {
            setIsLogin(true);
        }
    }

    const switchPage = (e) => {
        setIsLoginPage(!isLoginPage);
    }

    return (
        <div className="auth-page">
            {isLoginPage && <div className="login-container">
                <input className="login" type="text" placeholder="Enter login" onChange={e=>setUsername(e.target.value)}></input>
                <input className="password" type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)}></input>
                <div>
                    <label>
                        <input type="checkbox" className="remember-me"></input>
                        <span>Remember me</span>
                    </label>
                    <div className="forgot-password-container">
                        <a className="forgot-password" href="localhost">Forgot password?</a>
                    </div>
                </div>
                <button className="login-btn" onClick={handleLogin}>Login</button>
                <button className="register-btn" onClick={switchPage}>Register</button>
            </div>}
            {!isLoginPage && <div className="signup-container">
                <button className="back" onClick={switchPage}>back</button>
                <input className="login" type="text" placeholder="Enter login" onChange={e=>setUsername(e.target.value)}></input>
                <input className="password" type="password" placeholder="Enter password" onChange={e=>setPassword(e.target.value)}></input>
                <input className="password" type="password" placeholder="Repeat password" onChange={e=>setPassword(e.target.value)}></input>
                <input className="mail" type="mail" placeholder="mail" onChange={e=>setPassword(e.target.value)}></input>
                <button className="register-btn">Register</button>
            </div>

            }
        </div>
    );
};

export default Auth;