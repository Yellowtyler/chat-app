import { useState } from "react";
import { useRecoilState } from 'recoil';
import { chat } from '../utils/GlobalState';

const ChatBox = ({ chatBox }) => {

    const [backgroundColor, setBackgroundColor] = useState('white');    
    const [openedChat, setOpenedChat] = useRecoilState(chat);

    return (
        <li className="chat-box-container" 
            style={{'backgroundColor': backgroundColor}} 
            onMouseOver={e=>setBackgroundColor('whitesmoke')} 
            onMouseOut={e=>setBackgroundColor('white')} 
            onMouseDown={e=>setBackgroundColor('grey')}
            onClick={e=>setOpenedChat(chatBox)}>
            <p className="title">
              <span className="username">{chatBox.recipientName}</span>
              <span className="time">{chatBox.lastMessageDate}</span>  
            </p>
            <p className="last-message-box">
                <span className="last-message-user">{chatBox.lastMessageUser}:</span>
                <span className="last-message">{chatBox.lastMessage}</span>
            </p>
        </li>
    );
};

export default ChatBox;