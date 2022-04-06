
const Auth = () => {

    
    return (
        <div className="auth-page">
            <div className="auth-container">
                <input className="login" type="text" placeholder="Enter login"></input>
                <input className="password" type="password" placeholder="Enter password"></input>
                <div>
                    <label>
                        <input type="checkbox" className="remember-me"></input>
                        <span>Remember me</span>
                    </label>
                    <div className="forgot-password-container">
                        <a className="forgot-password" href="localhost">Forgot password?</a>
                    </div>
                </div>
                <button className="login-btn" >Login</button>
                <button className="register-btn">Register</button>
            </div>
        </div>
    );
};

export default Auth;