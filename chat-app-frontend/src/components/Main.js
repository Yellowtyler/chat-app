
import ChatList from './ChatList';
import Chat from './Chat';
import Search from './Search';
import './../styles/main.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { logout } from '../api/AuthAPI';
import { getCurrentUserId } from '../api/APIUtils';
import { getChats } from '../api/MessageAPI';
import { useRecoilState } from 'recoil';
import { chat } from "../recoil/example/atom";

const Main = ({setIsLogin}) => {

    const [chatList, setChatList] = useState([]);
    const [openedChat, setOpenedChat] = useRecoilState(chat);

    useEffect(() => {
        getChats(getCurrentUserId()).then(response=>{
            setChatList(response.data);
            console.log(response);
        }, error => {
            console.log(error);
            if (error.response.status === 401) {
                logout();
                setIsLogin(false);
            }
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
                    <ChatList chatList={chatList} setOpenedChat={setOpenedChat}/>
                </div> 
                { openedChat.chatId !== null && <Chat chat={openedChat}/>}
            </div>
        </div>
    );
};

export default Main;