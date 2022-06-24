import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from 'recoil';
import { countReceivedMessages } from "../../api/MessageAPI";
import { chat, chatMessages, userId } from '../../recoil/example/atom';
import { calculateMessageDate } from "../../utils/DateUtils";

const ChatBox = ({ chatBox }) => {

    const [backgroundColor, setBackgroundColor] = useState('white');    
    const [, setOpenedChat] = useRecoilState(chat);
    const [countMessages, setCountMessages] = useState(0);
    const [messages, ] = useRecoilState(chatMessages);
    const [userID, ] = useRecoilState(userId);
    
    const calculateLastMessageDate = useMemo(() => {
        return calculateMessageDate(chatBox.lastMessageDate);
    }, [messages]);

    useEffect(()=>{
        countReceivedMessages(chatBox.recipientId, userID)
            .then(response => setCountMessages(response.data))
            .catch(e=>console.log(e.response));
    }, [messages]);

    const shortenString = () => {
        return chatBox.lastMessage.length <= 30 ? chatBox.lastMessage : chatBox.lastMessage.substring(0, 30) + "...";
    }

    return (
        <li className="chat-box-container" 
            style={{'backgroundColor': backgroundColor}} 
            onMouseOver={e=>setBackgroundColor('whitesmoke')} 
            onMouseOut={e=>setBackgroundColor('white')} 
            onMouseDown={e=>setBackgroundColor('grey')}
            onClick={e=>setOpenedChat(chatBox)}>
            <p className="title">
              <span className="username">{chatBox.recipientName}</span>
              <span className="time">{calculateLastMessageDate}</span>  
            </p>
            <p className="last-message-box">
                <span className="last-message-user">{chatBox.lastMessageUser}:</span>
                <span className="last-message">{shortenString()}</span>
                {countMessages !== 0 && <span className="count-received-messages">{countMessages}</span>}
            </p>
        </li>
    );
};

export default ChatBox;