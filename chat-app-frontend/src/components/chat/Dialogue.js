import MessageBox from "./MessageBox";
import { useRecoilState } from "recoil";
import { chatMessages, popupActive, popupMessage, userId } from "../../recoil/example/atom";
import { handleError } from "../../api/APIUtils";
import { getMessages } from "../../api/MessageAPI";
import { useEffect, useRef } from "react";

const Dialogue = ({ chat, isClicked, messageLimit, setMessageLimit }) => {

    const [messages, setMessages] = useRecoilState(chatMessages);
    const [, setPopupMessage] = useRecoilState(popupMessage);
    const [, setActivePopup] = useRecoilState(popupActive);
    const [userID, ] = useRecoilState(userId);
    const messageBoxRef = useRef(null);
    
    useEffect(()=> {
        getMessages(userID, chat.recipientId, messageLimit).then(response => {
            if (response.data[0] !== null) {
                setMessages(response.data);
            }
        }, error => {
            setPopupMessage(handleError(error.response.status));
            setActivePopup(true);
        });
    }, [messages.length, messageLimit]);

    useEffect(() => {
        scrollToBottom();
    }, [isClicked, messages.length]);

    const scrollToBottom = () => {
        messageBoxRef.current?.scrollIntoView({behavior: "smooth"});
    };

    const handleScroll = (event) => {
        const { scrollHeight, scrollTop, clientHeight } = event.target;
        const scroll = scrollHeight - scrollTop - clientHeight;
        if (scroll > (scrollHeight - clientHeight) * 0.95) {
            console.log(scroll);
            setMessageLimit(messageLimit+10);
        }
    };

    return (
        <div className="dialog-container" onScrollCapture={handleScroll}>
            {messages.length > 0 && messages.map(m=><MessageBox message={m} chat={chat}/>)}
            {messages.length === 0 && <h5>Start conversation!</h5>}
            <div ref={messageBoxRef}/>
        </div>
    );
};

export default Dialogue;