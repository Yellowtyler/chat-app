import { useEffect, useState, useMemo } from "react";
import { handleError, getCurrentUserName } from "../api/APIUtils";
import { getAllMessages } from "../api/MessageAPI";
import Dialog from "./Dialog";
import { useRecoilState } from "recoil";
import { popupMessage, userId, chatMessages } from '../recoil/example/atom';
import { BiSend } from "react-icons/bi";

var stompClient = null;

const Chat = ({ chat, setActivePopup }) => {

    const [messages, setMessages] = useRecoilState(chatMessages);
    const [sendText, setSendText] = useState('');
    const [, setPopupMessage] = useRecoilState(popupMessage);
    const [userID, ] = useRecoilState(userId);
    const senderName = useMemo(() => getCurrentUserName(), [getCurrentUserName]);

    useEffect(() => {
        getAllMessages(userID, chat.recipientId).then(response => {
            setMessages(response.data);
        }, error => {
            setPopupMessage(handleError(error.response.status));
            setActivePopup(true);
        });
        connect();
    }, [chat.chatId]);


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
        setMessages(newMessages);
    };

    const sendMessage = () => {
        if (sendText.trim() !== "") {
            const message = {
                senderId: userID,
                recipientId: chat.recipientId,
                senderName: senderName,
                recipientName: chat.recipientName,
                content: sendText,
                creationDate: new Date(),
            };
            stompClient.send("/app/chat", {}, JSON.stringify(message));
            console.log(message);
            const newMessages = [...messages];
            newMessages.push(message);
            setMessages(newMessages);
            setSendText('');
        
        }
    };

    return (
        <div className="chat-container">
                <Dialog chat={chat} setActivePopup={setActivePopup}/>
                <div className="chat-input-container">
                    <textarea className="chat-input" type="text" rows='3' cols='25' placeholder="Enter text..." value={sendText} onChange={e=>setSendText(e.target.value)} 
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                sendMessage();
                                setSendText('');
                            }
                        }}>
                    </textarea>
                    <BiSend className="send-btn" size={30} onClick={e=>sendMessage()}></BiSend>
                </div>
        </div>
    );
};

export default Chat;