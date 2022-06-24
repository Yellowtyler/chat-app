import '../../styles/auth.css';
import { useState } from 'react';
import { Login } from './Login';
import { Signup } from './Signup';

const Auth = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);

    return (
        <div className='container'>
            <div className="auth-page">
                {isLoginPage && <Login isLoginPage={isLoginPage} setIsLoginPage={setIsLoginPage}/>}
                {!isLoginPage && <Signup isLoginPage={isLoginPage} setIsLoginPage={setIsLoginPage}/>}        
            </div>
        </div>
    );
};

export default Auth;