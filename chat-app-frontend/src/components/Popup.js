
import '../styles/popup.css';
import { useRecoilState } from 'recoil';
import { popupActive, isLoggedUser, popupMessage } from '../recoil/example/atom';
import { logout } from '../api/AuthAPI';

const Popup = ({active, setActive}) => {

    const [message, setMessage] = useRecoilState(popupMessage);
    const [isLogin, setIsLogin] = useRecoilState(isLoggedUser);

    const handleClick = (e) => {
        logout();
        setIsLogin(false);
        setMessage('');
        setActive(false);
    };

    return (
        <div className='popup'>
            <div className='popup-content'>
                <h2>Error!</h2>
                <span>{message}</span>
                <button onClick={handleClick}>Ok</button>
            </div>
        </div>
    );
};

export default Popup;