import ChatBox from './ChatBox';
import Chat from './Chat';
import Search from './Search';
import './../styles/main.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { logout } from '../api/AuthAPI';
import { handleError } from '../api/APIUtils';
import { getChats } from '../api/MessageAPI';
import { useRecoilState } from 'recoil';
import { chat, popupMessage } from "../recoil/example/atom";
import { isLoggedUser, userId } from '../recoil/example/atom';

const Main = ({setActivePopup}) => {

    const [, setIsLogin] = useRecoilState(isLoggedUser);
    const [openedChat, ] = useRecoilState(chat);
    const [, setPopupMessage] = useRecoilState(popupMessage);
    const [userID, ] = useRecoilState(userId);

    const [chatList, setChatList] = useState([]);

    useEffect(() => {
        getChats(userID).then(response=>{
            setChatList(response.data);
            console.log(response);
        }, error => {
            setActivePopup(true);
            setPopupMessage(handleError(error.response.status));
        });
    }, []);

    return (
        <div className="main-page">
            <div className="navbar">
                <span>Menu</span>
                <Button className="logout-btn" variant="success" onClick={e=>{logout(); setIsLogin(false);}}>Logout</Button>
            </div>
            <div className="messanger-container">
                <div className="chat-and-search-container">
                    <Search/>
                    <ul className="chat-list-container">
                    { chatList.map(chatBox => (<ChatBox chatBox={chatBox}/>)) }
                    </ul>
                </div> 
                { openedChat.chatId !== null && <Chat chat={openedChat} setActivePopup={setActivePopup}/> }
            </div>
        </div>
    );
};

export default Main;