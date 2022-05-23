import './../styles/auth.css';
import { loginUser, signupUser } from '../api/AuthAPI';
import { validateUsername, validateMail, validatePassword } from '../utils/ValidationUtils';
import { useState } from 'react';
import {BiArrowBack} from "react-icons/bi";
import { useRecoilState } from 'recoil';
import { isLoggedUser, userId, popupMessage, popupActive } from '../recoil/example/atom';
import { Alert } from 'react-bootstrap';
import { getCurrentUserId } from '../api/APIUtils';

const Auth = () => {

    const [,setIsLogin] = useRecoilState(isLoggedUser);
    const [, setUserId] = useRecoilState(userId);
    const [, setActivePopup] = useRecoilState(popupActive);
    const [, setPopupMessage] = useRecoilState(popupMessage);

    const [isLoginPage, setIsLoginPage] = useState(true);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [mail, setMail] = useState('');

    const [errorMsg, setErrorMsg] = useState('');
    
    // TODO: revise this
    const [usernameFieldColor, setUsernameFieldColor] = useState('black');
    const [passwordFieldColor, setPasswordFieldColor] = useState('black');
    const [repeatPasswordFieldColor, setRepeatPasswordFieldColor] = useState('black');
    const [mailFieldColor, setMailFieldColor] = useState('black');

    const [show, setShow] = useState(false);

    const handleLogin = (e) => {
        const login = {
            username: username,
            password: password
        };
        loginUser(login).then(()=>{
            setUserId(getCurrentUserId());
            setIsLogin(true);
        }, error => {
            setPopupMessage("User " + username + " wasn't found!");
            setActivePopup(true);
        });
    }

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
        <div className='container'>
        <div className="auth-page">
            {isLoginPage && <div className="login-container">
                <input className="login" type="text" placeholder="Enter login" onChange={e=>setUsername(e.target.value)}></input>
                <input className="password" type="password" placeholder="Enter password" 
                    onChange={e=>setPassword(e.target.value)}
                    onKeyPress={e => {
                        if (e.key === "Enter") {
                            handleLogin(e);
                        }
                    }}>

                </input>
                <div className="forgot-password-container">
                    <a className="forgot-password" href="localhost">Forgot password?</a>
                </div>
                <button className="login-btn" onClick={handleLogin}>Login</button>
                <button className="signup-btn" onClick={switchPage}>Signup</button>
            </div>}
            {!isLoginPage && !show && <div className="signup-container">
                <BiArrowBack className="back" onClick={switchPage}/>
                <input className="login-signup" type="text"  style={{'color': usernameFieldColor}} placeholder="Enter login" onChange={e=>changeAndValidateUsername(e.target.value)}></input>
                <input className="password-signup" style={{'color': passwordFieldColor}} type="password" placeholder="Enter password" onChange={e=>changeAndValidatePassword(e.target.value)}></input>
                <input className="password-signup" style={{'color': repeatPasswordFieldColor}} type="password" placeholder="Repeat password" onChange={e=>changeAndValidateRepeatPassword(e.target.value)}></input>
                <input className="mail" type="mail" style={{'color': mailFieldColor}} placeholder="Enter mail" onChange={e=>changeAndValidateMail(e.target.value)}></input>
                { errorMsg.length > 0 && <span className="error-message">{errorMsg}</span>}
                <button className="signup-signup-btn" onClick={handleSignup}>Signup</button>
            </div>}
                 
            <Alert show={show} variant="success" className="auth-alert">
                <Alert.Heading>You successfully signed up!</Alert.Heading>
                <div className="d-flex justify-content-end">
                    <button className="auth-alert-btn" onClick={() => {setShow(false); switchPage();}}>
                    Go to Login page
                    </button>
                </div>
            </Alert>
        </div>
        </div>
    );
};

export default Auth;