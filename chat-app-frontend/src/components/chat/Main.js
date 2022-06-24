import '../../styles/main.css';
import Chat from './Chat';
import { useEffect, useState } from 'react';
import { logout } from '../../api/AuthAPI';
import { useRecoilState } from 'recoil';
import { chat, chatMessages } from "../../recoil/example/atom";
import { isLoggedUser, userId } from '../../recoil/example/atom';
import SearchResult from './SearchResult';
import { BiArrowBack, BiExit } from "react-icons/bi";
import ChatBoxList from './ChatBoxList';
import { getUserStatus, updateUserStatus } from '../../api/UserAPI';

var stompClient = null;

const Main = () => {
    const [, setIsLogin] = useRecoilState(isLoggedUser);
    const [openedChat, setOpenedChat] = useRecoilState(chat);
    const [userID, setUserId] = useRecoilState(userId);
    const [messages, setMessages ] = useRecoilState(chatMessages);
    const [isSearch, setIsSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [isOtherUserOnline, setIsOtherUserOnline] = useState(false);

    useEffect(() => {
        connect();
        updateUserStatus(userID, true);  
        window.addEventListener('beforeunload', handleTabClosing);
        return () => {
            window.removeEventListener('beforeunload', handleTabClosing);
        }
    }, []);

    const handleTabClosing = () => {
        updateUserStatus(userID, false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (openedChat.recipientId) {
                getUserStatus(openedChat.recipientId).then(response => {
                    setIsOtherUserOnline(response.data);
                });
            }
        }, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [openedChat]);

    const handleLogout = () => {
        updateUserStatus(userID, false);
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

    const connect = () => {
        const Stomp = require("stompjs");
        var SockJS = require("sockjs-client");
        SockJS = new SockJS("http://localhost:8080/ws");
        stompClient = Stomp.over(SockJS);
        stompClient.connect({}, onConnected, onError);
    };


    const onConnected = () => {
        console.log("connected");
        stompClient.subscribe(
            "/user/" + userID + "/queue/messages",
            onMessageReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {
        const newMessages = [...messages];
        newMessages.push(msg);
        console.log(newMessages);
        setMessages(newMessages);
    };

    const sendMessage = (message) => {
        stompClient.send("/app/chat", {}, JSON.stringify(message));
        const newMessages = [...messages];
        newMessages.push(message);
        setMessages(newMessages);
    }

    return (
        <div className="main-page">
            <div className="navbar">
                {openedChat.recipientName && <div className='recipient-info'>
                    <span>{openedChat.recipientName}</span>
                {isOtherUserOnline ? <span>online</span> : <span>offline</span>}                    
                </div>}
                <BiExit className="logout-btn" size={25} onClick={handleLogout}>Logout</BiExit>
            </div>
            <div className="messanger-container">
                <div className="chat-and-search-container">
                    <div className="search-container">
                        {isSearch && <BiArrowBack className="back" size={20} onClick={e=>{setIsSearch(false); setSearchValue('');}}/>}
                        <input className="search" type="text" 
                            placeholder="Search"
                            onKeyPress={e => {
                                if (e.key === "Enter") {
                                    setIsSearch(true);
                                    setSearchValue(e.target.value);
                                }
                            }}>
                        </input>
                    </div>
                    {isSearch && <SearchResult searchValue={searchValue} isSearch={isSearch}/>}
                    {!isSearch && <ChatBoxList/>}
                </div> 
                { openedChat.chatId !== null && <Chat chat={openedChat} sendMessage={sendMessage}/> }
            </div>
        </div>
    );
};

export default Main;