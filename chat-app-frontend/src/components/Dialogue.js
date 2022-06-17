import MessageBox from "./MessageBox";
import { useRecoilState } from "recoil";
import { chatMessages, popupActive, popupMessage, userId } from "../recoil/example/atom";
import { handleError } from "../api/APIUtils";
import { getAllMessages } from "../api/MessageAPI";
import { useEffect, useRef } from "react";

const Dialogue = ({ chat }) => {

    const [messages, setMessages] = useRecoilState(chatMessages);
    const [, setPopupMessage] = useRecoilState(popupMessage);
    const [, setActivePopup] = useRecoilState(popupActive);
    const [userID, ] = useRecoilState(userId);
    const messageBoxRef = useRef(null);

    useEffect(()=> {
        getAllMessages(userID, chat.recipientId).then(response => {
            console.log(response.data);
            if (response.data[0] !== null) {
                setMessages(response.data);
            }
        }, error => {
            setPopupMessage(handleError(error.response.status));
            setActivePopup(true);
        });
        scrollToBottom();
    }, [messages.length]);



    const scrollToBottom = () => {
        messageBoxRef.current?.scrollIntoView({behavior: "smooth"});
    };
    return (
        <div className="dialog-container">
            {messages.length > 0 && messages.map(m=><MessageBox message={m} chat={chat}/>)}
            {messages.length === 0 && <h5>Start conversation!</h5>}

            <div ref={messageBoxRef}/>
        </div>
    );
};

export default Dialogue;