import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getCurrentUserId, handleError } from "../api/APIUtils";
import { getAllMessages } from "../api/MessageAPI";
import Dialog from "./Dialog";
import { chatMessages } from "../recoil/example/atom";
import { useRecoilState } from "recoil";
import { popupMessage } from '../recoil/example/atom';

var stompClient = null;

const Chat = ({ chat, setActivePopup }) => {

    const [messages, setMessages] = useRecoilState(chatMessages);
    const [sendText, setSendText] = useState('');
    const [popupMessage1, setPopupMessage] = useRecoilState(popupMessage);

    useEffect(() => {
        getAllMessages(getCurrentUserId(), chat.recipientId).then(response => {
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
            "/user/" + getCurrentUserId() + "/queue/messages",
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
                senderId: getCurrentUserId(),
                recipientId: chat.recipientId,
                senderName: chat.senderName,
                recipientName: chat.recipientName,
                content: sendText,
                creationDate: new Date(),
            };
            stompClient.send("/app/chat", {}, JSON.stringify(message));
      
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
                    <input className="text-input" type="text" placeholder="Enter text" value={sendText} onChange={e=>setSendText(e.target.value)} 
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                sendMessage();
                                setSendText('');
                            }
                        }}>
                    </input>
                    <Button onClick={e=>sendMessage()}>Send</Button>
                </div>
        </div>
    );
};

export default Chat;