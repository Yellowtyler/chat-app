import './../styles/main.css';
import Chat from './Chat';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { logout } from '../api/AuthAPI';
import { useRecoilState } from 'recoil';
import { chat, chatMessages } from "../recoil/example/atom";
import { isLoggedUser, userId } from '../recoil/example/atom';
import SearchResult from './SearchResult';
import { BiArrowBack } from "react-icons/bi";
import ChatBoxList from './ChatBoxList';

var stompClient = null;

const Main = () => {
    const [, setIsLogin] = useRecoilState(isLoggedUser);
    const [openedChat, setOpenedChat] = useRecoilState(chat);
    const [userID, setUserId] = useRecoilState(userId);
    const [messages, setMessages ] = useRecoilState(chatMessages);
    const [isSearch, setIsSearch] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        connect();
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
                    {!isSearch && <ChatBoxList/>}
                </div> 
                { openedChat.chatId !== null && <Chat chat={openedChat} sendMessage={sendMessage}/> }
            </div>
        </div>
    );
};

export default Main;