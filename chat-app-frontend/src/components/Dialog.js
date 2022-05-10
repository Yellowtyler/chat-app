import MessageBox from "./MessageBox";
import { useRecoilState } from "recoil";
import { chatMessages, popupMessage } from "../recoil/example/atom";
import { getCurrentUserId, handleError } from "../api/APIUtils";
import { getAllMessages } from "../api/MessageAPI";
import { useEffect } from "react";

const Dialog = ({ chat, setActivePopup }) => {

    const [messages, setMessages] = useRecoilState(chatMessages);
    const [popupMessage1, setPopupMessage] = useRecoilState(popupMessage);

    useEffect(()=> {
        getAllMessages(getCurrentUserId(), chat.recipientId).then(response => {
            setMessages(response.data);
        }, error => {
            setPopupMessage(handleError(error.response.status));
            setActivePopup(true);
        });
    }, [messages.length]);

    return (
        <div className="dialog-container">
            {messages.map(m=><MessageBox message={m}/>)}   
        </div>
    );
};

export default Dialog;