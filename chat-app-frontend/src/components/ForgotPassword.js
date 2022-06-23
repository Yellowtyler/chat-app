import React from 'react'
import {BiArrowBack} from "react-icons/bi";

export const ForgotPassword = ({ setIsForgetPassword }) => {
  
    const switchPage = (e) => {
        setIsForgetPassword(false);
    }
  
    const sendMail = (e) => {

    };

    return (
        <div className='forgot-password-container'>
            <BiArrowBack className='forgot-password-back' size={20} onClick={switchPage}/>
            <input className='forgot-password-input' type="text" placeholder='Enter your username or email'></input>
            <button className='forgot-password-btn' onClick={sendMail}>Send</button>
        </div>
    );
}
