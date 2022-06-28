import React, { useState } from 'react'
import { BiArrowBack } from "react-icons/bi";
import { sendMailToChangePassword } from '../../api/AuthAPI';
import { popupActive, popupMessage } from '../../recoil/example/atom';
import { useRecoilState } from 'recoil';
import { AlertMessage } from '../utils/AlertMessage';
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
            <AlertMessage show={show} handleClick={() => {setShow(false); switchPage();}} title='Check your mail!' message='Go to Login page'/>
        </div>
    );
}
