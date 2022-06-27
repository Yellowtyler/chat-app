import React, { useEffect, useState } from 'react'
import { resetPassword, validateToken } from '../../api/AuthAPI';
import { useSearchParams, useHistory } from 'react-router-dom';
import '../../styles/auth.css';
import { AlertMessage } from '../AlertMessage';
import jwtDecode from "jwt-decode";

export const ResetPassword = () => {
    
    const [isTokenValid, setIsTokenValid] = useState(true);
    const [resetPassoword, setResetPassword] = useState('');
    const [repeatResetPassword, setRepeatResetPassword] = useState('');
    let [searchParams, ] = useSearchParams();
    const [show, setShow] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');
        validateToken(token).then(response => {
            console.log(response.data);
            if (!response.data.flag) {
                setIsTokenValid(false);
            } else {
                const name = jwtDecode(token).name;
                setUsername(name);
            }
        });
    }, []);
    

    const handleClick = (e) => {
        if (resetPassoword === repeatResetPassword) {
            resetPassword({username: username, password : resetPassoword}).then(() => {
                setShow(true);
            });
        }
    };

    const switchPage = (e) => {
        this.props.history.push("/");
        setShow(false);
    };

    return (
        <div className='container'>
            {isTokenValid && 
            <div className='login-container'>
                <input className='password' placeholder='Enter new password' type="password" onChange={e=>setResetPassword(e.target.value)}></input>
                <input className='password' placeholder='Repeat new password' type="password" onChange={e=>setRepeatResetPassword(e.target.value)}></input>
                <button onClick={handleClick}>Reset password</button>
                <AlertMessage show={show} handleClick={switchPage} title='Successfully changed password' message='Go to Login page'/>
            </div>}
            {!isTokenValid && <AlertMessage show={!isTokenValid} handleClick={switchPage} title='Token is expired!' message='Go to Login page' variant='danger'/> }
        </div>
    );
}
