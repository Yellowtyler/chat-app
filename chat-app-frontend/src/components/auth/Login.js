import React from 'react'
import './../../styles/auth.css';
import { loginUser } from '../../api/AuthAPI';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ForgotPassword } from './ForgotPassword';
import { isLoggedUser, userId, popupMessage, popupActive } from '../../recoil/example/atom';
import { getCurrentUserId } from '../../api/APIUtils';

export const Login = ({ isLoginPage, setIsLoginPage }) => {

    const [,setIsLogin] = useRecoilState(isLoggedUser);
    const [, setUserId] = useRecoilState(userId);
    const [, setActivePopup] = useRecoilState(popupActive);
    const [, setPopupMessage] = useRecoilState(popupMessage);
    const [isForgetPassword, setIsForgetPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        const login = {
            username: username,
            password: password
        };
        loginUser(login).then(()=>{
            setUserId(getCurrentUserId());
            setIsLogin(true);
        }, error => {
            let message = "";
            if (error.response.status === 0) {
                message = "Server is not available!";
            } else {
                message = "Wrong password or user " + username + " wasn't found!";
            }
            setPopupMessage(message);
            setActivePopup(true);
        });
    }

    const handleClickForgetPassword = (e) => {
        setIsForgetPassword(true);
    };

    const switchPage = (e) => {
        setPassword('');
        setUsername('');
        setIsLoginPage(!isLoginPage);
    }

    return (
        <div>
        {!isForgetPassword && <div className="login-container">
            <input className="login" type="text" placeholder="Enter login" onChange={e=>setUsername(e.target.value)}></input>
            <input className="password" type="password" placeholder="Enter password" 
                onChange={e=>setPassword(e.target.value)}
                onKeyPress={e => {
                    if (e.key === "Enter") {
                        handleLogin(e);
                    }
                }}
            >
            </input>
            <span className="forgot-password" onClick={handleClickForgetPassword}>Forgot password?</span>
            <button className="login-btn" onClick={handleLogin}>Login</button>
            <button className="signup-btn" onClick={switchPage}>Signup</button>
            </div>}
        {isForgetPassword && <ForgotPassword setIsForgetPassword={setIsForgetPassword}/>}
        </div>
  );
}
