import { useState } from "react";

const ChatBox = ({ chat }) => {

    const [backgroundColor, setBackgroundColor] = useState('whitesmoke');    

    return (
        <li className="chat-box-container" 
            style={{'background-color': backgroundColor}} 
            onMouseOver={e=>setBackgroundColor('white')} 
            onMouseOut={e=>setBackgroundColor('whitesmoke')} 
            onMouseDown={e=>setBackgroundColor('grey')} >
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