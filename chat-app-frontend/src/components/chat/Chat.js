import './../../styles/chat.css';
import { useEffect, useState } from "react";
import { handleError } from "../../api/APIUtils";
import { getMessages } from "../../api/MessageAPI";
import Dialogue from "./Dialogue";
import { useRecoilState } from "recoil";
import { popupMessage, userId, chatMessages, popupActive } from '../../recoil/example/atom';
import { BiSend, BiDownArrowAlt } from "react-icons/bi";

const Chat = ({ chat, sendMessage }) => {

    const [, setMessages] = useRecoilState(chatMessages);
    const [, setPopupMessage] = useRecoilState(popupMessage);
    const [, setActivePopup] = useRecoilState(popupActive);
    const [userID, ] = useRecoilState(userId);
    const [sendText, setSendText] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [messageLimit, setMessageLimit] = useState(10);

    useEffect(() => {
        getMessages(userID, chat.recipientId, messageLimit).then(response => {
            setMessages(response.data);
            console.log(response.data);
        }, error => {
            setPopupMessage(handleError(error.response.status));
            setActivePopup(true);
        });
    }, [chat.chatId, messageLimit]);

    const initAndSendMessage = () => {
        if (sendText.trim() !== "") {
            const message = {
                senderId: userID,
                recipientId: chat.recipientId,
                content: sendText,
                creationDate: new Date().toISOString(),
            };
            console.log(message);
            sendMessage(message);
            setSendText('');
        }
    };

    const handleClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="chat-container">
                <Dialogue chat={chat} isClicked={isClicked} messageLimit={messageLimit} setMessageLimit={setMessageLimit}/>
                <div className='scroll-to-bottom-btn'>
                    <BiDownArrowAlt size={30} onClick={handleClick}></BiDownArrowAlt>
                </div>
                <div className="chat-input-container">
                    <textarea 
                        className="chat-input" type="text" 
                        rows='3' cols='25' maxlength="120" 
                        placeholder="Enter text..." value={sendText} 
                        onChange={e=>setSendText(e.target.value)} 
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                initAndSendMessage();
                                setSendText('');
                            }
                        }}>
                    </textarea>
                    <BiSend className="send-btn" size={30} onClick={e=>initAndSendMessage()}></BiSend>
                </div>
        </div>
    );
};

export default Chat;