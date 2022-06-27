import React, { useState } from 'react'
import { BiArrowBack } from "react-icons/bi";
import { sendMailToChangePassword } from '../../api/AuthAPI';
import { Alert } from 'react-bootstrap';
import { popupActive, popupMessage } from '../../recoil/example/atom';
import { useRecoilState } from 'recoil';
export const ForgotPassword = ({ setIsForgetPassword }) => {
  
    const [usernameOrMail, setUsernameOrMail] = useState('');
    const [show, setShow] = useState(false);
    const [, setActivePopup] = useRecoilState(popupActive);
    const [, setPopupMessage] = useRecoilState(popupMessage);

    const switchPage = (e) => {
        setIsForgetPassword(false);
    }
  
    const sendMail = (e) => {
        if (usernameOrMail.trim() !== '') {
            const request = { value : usernameOrMail };
            console.log(request);
            sendMailToChangePassword(request)
            .then(
                () => setShow(true), error => {
                    setPopupMessage("user with " + usernameOrMail + " wasn't found");
                    setActivePopup(true);
                }
            );
        }
    };

    return (
        <div className='forgot-password-container'>
            <BiArrowBack className='forgot-password-back' size={20} onClick={switchPage}/>
            <input 
                className='forgot-password-input' type="text"
                placeholder='Enter your username or email'
                onChange={e=>setUsernameOrMail(e.target.value)}>
            </input>
            <button className='forgot-password-btn' onClick={sendMail}>Send</button>
            <Alert show={show} variant="success" className="auth-alert">
                <Alert.Heading>Check your mail!</Alert.Heading>
                <div className="d-flex justify-content-end">
                    <button className="auth-alert-btn" onClick={() => {setShow(false); switchPage();}}>
                    Go to Login page
                    </button>
                </div>
            </Alert>
        </div>
    );
}
