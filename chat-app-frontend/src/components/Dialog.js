import MessageBox from "./MessageBox";
import { useRecoilState } from "recoil";
import { chatMessages } from "../recoil/example/atom";
import { getCurrentUserId } from "../api/APIUtils";
import { getAllMessages } from "../api/MessageAPI";
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