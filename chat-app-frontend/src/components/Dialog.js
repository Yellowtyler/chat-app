import MessageBox from "./MessageBox";
import { useRecoilState } from "recoil";
import { chatMessages } from "../utils/GlobalState";
import { getCurrentUserId } from "../api/AuthService";
import { getAllMessages } from "../api/MessageService";
import { useEffect } from "react";

const Dialog = ({ chat }) => {

    const [messages, setMessages] = useRecoilState(chatMessages);

    useEffect(()=> {
        getAllMessages(getCurrentUserId(), chat.recipientId).then(response => {
            setMessages(response.data);
        }, error => console.log(error));
    }, [messages.length]);

    return (
        <div className="dialog-container">
            {messages.map(m=><MessageBox message={m}/>)}   
        </div>
    );
};

export default Dialog;