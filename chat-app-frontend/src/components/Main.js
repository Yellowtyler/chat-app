
import ChatList from './ChatList';
import Chat from './Chat';
import Search from './Search';
import './../styles/main.css';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { getCurrentUser, logout } from '../api/AuthService';
import { getChats } from '../api/MessageService';

const Main = ({setIsLogin}) => {

    const [chatList, setChatList] = useState([]);

    useEffect(()=>{
        getChats(getCurrentUser()).then(response=>{
            setChatList(response);
            console.log(response);
        }, error=>{
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
                    <ChatList chatList={chatList}/>
                </div> 
                <div>
                    <Chat/>
                </div>
            </div>
        </div>
    );
};

export default Main;