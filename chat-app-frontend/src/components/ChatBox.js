import { useState } from "react";

const ChatBox = ({ chat, setOpenedChat }) => {

    const [backgroundColor, setBackgroundColor] = useState('white');    

    return (
        <li className="chat-box-container" 
            style={{'background-color': backgroundColor}} 
            onMouseOver={e=>setBackgroundColor('whitesmoke')} 
            onMouseOut={e=>setBackgroundColor('white')} 
            onMouseDown={e=>setBackgroundColor('grey')}
            onClick={e=>{console.log(chat); setOpenedChat(chat);}}
            >
            <p className="title">
              <span className="username">{chat.recipientName}</span>
              <span className="time">{chat.lastMessageDate}</span>  
            </p>
            <p className="last-message-box">
                <span className="last-message-user">{chat.lastMessageUser}:</span>
                <span className="last-message">{chat.lastMessage}</span>
            </p>
        </li>
    );
};

export default ChatBox;