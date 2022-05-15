import MessageBox from "./MessageBox";
import { useRecoilState } from "recoil";
import { chatMessages, popupActive, popupMessage, userId } from "../recoil/example/atom";
import { handleError } from "../api/APIUtils";
import { getAllMessages } from "../api/MessageAPI";
import { useEffect } from "react";

const Dialogue = ({ chat }) => {

    const [messages, setMessages] = useRecoilState(chatMessages);
    const [, setPopupMessage] = useRecoilState(popupMessage);
    const [, setActivePopup] = useRecoilState(popupActive);
    const [userID, ] = useRecoilState(userId);

    useEffect(()=> {
        getAllMessages(userID, chat.recipientId).then(response => {
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

export default Dialogue;