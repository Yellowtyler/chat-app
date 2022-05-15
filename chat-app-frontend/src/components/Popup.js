
import '../styles/popup.css';
import { useRecoilState } from 'recoil';
import { isLoggedUser, popupMessage, userId } from '../recoil/example/atom';
import { logout } from '../api/AuthAPI';

const Popup = ({active, setActive}) => {

    const [message, setMessage] = useRecoilState(popupMessage);
    const [, setIsLogin] = useRecoilState(isLoggedUser);
    const [, setUserId] = useRecoilState(userId);

    const handleClick = (e) => {
        logout();
        setIsLogin(false);
        setMessage('');
        setActive(false);
        setUserId(null);
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