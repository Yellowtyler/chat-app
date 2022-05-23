import './../styles/main.css';
import ChatBox from './ChatBox';
import Chat from './Chat';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { logout } from '../api/AuthAPI';
import { handleError } from '../api/APIUtils';
import { getChats } from '../api/MessageAPI';
import { useRecoilState } from 'recoil';
import { chat, popupActive, popupMessage } from "../recoil/example/atom";
import { isLoggedUser, userId } from '../recoil/example/atom';
import SearchResult from './SearchResult';
import {BiArrowBack} from "react-icons/bi";

const Main = () => {

    const [, setIsLogin] = useRecoilState(isLoggedUser);
    const [openedChat, setOpenedChat] = useRecoilState(chat);
    const [, setActivePopup] = useRecoilState(popupActive);
    const [, setPopupMessage] = useRecoilState(popupMessage);
    const [userID, setUserId] = useRecoilState(userId);

    const [chatList, setChatList] = useState([]);

    const [isSearch, setIsSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        getChats(userID).then(response=>{
            setChatList(response.data);
            console.log(response);
        }, error => {
            setActivePopup(true);
            setPopupMessage(handleError(error.response.status));
        });
    }, []);

    const handleLogout = () => {
        logout();
        setIsLogin(false);
        setUserId(null);
        setOpenedChat({
            chatId: null,
            lastMessage: "hi",
            lastMessageDate: "2022-05-07T21:29:54.619371",
            lastMessageUser: null,
            recipientId: "1",
            recipientName: null
        });
    };

    return (
        <div className="main-page">
            <div className="navbar">
                <span>Menu</span>
                <Button className="logout-btn" variant="success" onClick={handleLogout}>Logout</Button>
            </div>
            <div className="messanger-container">
                <div className="chat-and-search-container">
                    <div className="search-container">
                        {isSearch &&<BiArrowBack className="back" onClick={e=>{setIsSearch(false); setSearchValue('');}}/>}
                        <input className="search" type="text" 
                            placeholder="Search"
                            value={searchValue}
                            onChange={e=>setSearchValue(e.target.value)}
                            onKeyPress={e=>{
                                if (e.key === "Enter") {
                                    setIsSearch(true);
                                }
                            }}>
                        </input>
                    </div>
                    {isSearch && <SearchResult searchValue={searchValue} isSearch={isSearch}/>}
                    {!isSearch && <ul className="chat-list-container">
                        { chatList.map(chatBox => (<ChatBox chatBox={chatBox}/>)) }
                    </ul>
                    }
                </div> 
                { openedChat.chatId !== null && <Chat chat={openedChat}/> }
            </div>
        </div>
    );
};

export default Main;