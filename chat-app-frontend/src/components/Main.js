
import { useState, useEffect } from "react";
import ChatList from './ChatList';
import Chat from './Chat';
import Search from './Search';

const Main = () => {
    return (
        <div className="main-page">
            <span>Menu</span>
            <button className="logout-btn">Logout</button>
            <Search/>
            <ChatList/>
            <Chat/>
        </div>
    );
};

export default Main;