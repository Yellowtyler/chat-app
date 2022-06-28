import React from 'react'
import './../../styles/auth.css';
import { signupUser } from '../../api/AuthAPI';
import { validateUsername, validateMail, validatePassword } from '../../utils/ValidationUtils';
import { useState } from 'react';
import { BiArrowBack }  from "react-icons/bi";
import { AlertMessage } from '../utils/AlertMessage';

export const Signup = ({ isLoginPage, setIsLoginPage }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [mail, setMail] = useState('');

    const [show, setShow] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    
    const [usernameFieldColor, setUsernameFieldColor] = useState('black');
    const [passwordFieldColor, setPasswordFieldColor] = useState('black');
    const [repeatPasswordFieldColor, setRepeatPasswordFieldColor] = useState('black');
    const [mailFieldColor, setMailFieldColor] = useState('black');

    const handleSignup = (e) => {
        const resultOfValidation = validatePassword(password, repeatPassword);
        if (!validateUsername(username)) {
            setErrorMsg('Username must have at least 4 charaters and contain latin letters');
            setUsernameFieldColor('red');
        }
        if (resultOfValidation !== 'ok') {
            setErrorMsg(resultOfValidation);
            setPasswordFieldColor('red');
        } else if (!validateMail(mail)) {
            setErrorMsg('Invalid mail!');
            setMailFieldColor('red');
        } else {     
            const signupRequest = {
                username: username,
                password: password,
                mail: mail
            };
            console.log(JSON.stringify(signupRequest));
            signupUser(signupRequest).then(()=>setShow(true), error => {
                if (error.response.status === 400) {
                    setErrorMsg('This username already exists!');
                    setUsernameFieldColor('red');
                }
            });
        }
    };

    const changeAndValidateUsername = (username) => {
        if (!validateUsername(username)) {
            setErrorMsg('Username must have at least 4 charaters and contain latin letters');
            setUsernameFieldColor('red');
        } else {
            setErrorMsg('');
            setUsernameFieldColor('black');
        }
        setUsername(username);
    }

    const changeAndValidatePassword = (password) => {
        const resultOfPasswordValidation = validatePassword(password, repeatPassword);
        if (resultOfPasswordValidation !== 'ok') {
            setErrorMsg(resultOfPasswordValidation);
            setPasswordFieldColor('red');
        } else {
            setErrorMsg('');
            setPasswordFieldColor('black');
        }
        setPassword(password);
    }

    const changeAndValidateRepeatPassword = (repeatPassword) => {
        if (repeatPassword !== password) {
            setErrorMsg('Password fields do not match! Try again');
            setPasswordFieldColor('red');
            setRepeatPasswordFieldColor('red');
        } else {
            setErrorMsg('');
            setPasswordFieldColor('black');
            setRepeatPasswordFieldColor('black');
        }
        setRepeatPassword(repeatPassword);
    }

    const changeAndValidateMail = (mail) => {
        if (!validateMail(mail)) {
            setErrorMsg('Invalid mail!');
            setMailFieldColor('red');
        } else {
            setErrorMsg('');
            setMailFieldColor('black');
        }
        setMail(mail);
    };

    const switchPage = (e) => {
        setPassword('');
        setUsername('');
        setRepeatPassword('');
        setMail('');
        setErrorMsg('');
        setUsernameFieldColor('black');
        setPasswordFieldColor('black');
        setRepeatPasswordFieldColor('black');
        setMailFieldColor('black');
        setIsLoginPage(!isLoginPage);
    }

    return (
        <div className="signup-container">
            <BiArrowBack size={20} className="back" onClick={switchPage}/>
            <input className="login-signup" type="text"  style={{'color': usernameFieldColor}} placeholder="Enter login" onChange={e=>changeAndValidateUsername(e.target.value)}></input>
            <input className="password-signup" style={{'color': passwordFieldColor}} type="password" placeholder="Enter password" onChange={e=>changeAndValidatePassword(e.target.value)}></input>
            <input className="password-signup" style={{'color': repeatPasswordFieldColor}} type="password" placeholder="Repeat password" onChange={e=>changeAndValidateRepeatPassword(e.target.value)}></input>
            <input className="mail" type="mail" style={{'color': mailFieldColor}} placeholder="Enter mail" onChange={e=>changeAndValidateMail(e.target.value)}></input>
            { errorMsg.length > 0 && <span className="error-message">{errorMsg}</span>}
            <button className="signup-signup-btn" onClick={handleSignup}>Signup</button>
            <AlertMessage show={show} handleClick={() => {setShow(false); switchPage();}} title='You successfully signed up!' message='Go to Login page'/>
       
        </div>
    );
}
