
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { getCurrentUser } from "../api/AuthService";
import { getAllMessages } from "../api/MessageService";
import Dialog from "./Dialog";

var stompClient = null;

const Chat = ({ chat }) => {

    const [messages, setMessages] = useState([]);
    const [sendText, setSendText] = useState('');
    
    useEffect(() => {
            console.log(chat);
            getAllMessages(getCurrentUser(), chat.recipientId).then(response => {
                setMessages(response.data);
            }, error => console.log(error));
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
            "/user/" + getCurrentUser() + "/queue/messages",
            onMessageReceived
        );
    };

    const onError = (err) => {
        console.log(err);
    };

    const onMessageReceived = (msg) => {
        console.log(msg);
    };

    const sendMessage = () => {
        if (sendText.trim() !== "") {
            const message = {
              senderId: getCurrentUser(),
              recipientId: chat.id,
              senderName: chat.senderName,
              recipientName: chat.recipientName,
              content: sendText,
              timestamp: new Date(),
            };
            stompClient.send("/app/chat", {}, JSON.stringify(message));
      
            const newMessages = [...messages];
            newMessages.push(message);
            setMessages(newMessages);
        }
    };

    return (
        <div className="chat-container">
                <Dialog messages={messages}/>
                <div className="chat-input-container">
                    <input type="text" placeholder="Enter message" onChange={e=>setSendText(e.target.value)}></input>
                    <Button onClick={e=>sendMessage()}>Send</Button>
                </div>
        </div>
    );
};

export default Chat;