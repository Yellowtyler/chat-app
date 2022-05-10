import MessageBox from "./MessageBox";
import { useRecoilState } from "recoil";
import { chatMessages, isLoggedUser } from "../recoil/example/atom";
import { getCurrentUserId } from "../api/APIUtils";
import { getAllMessages } from "../api/MessageAPI";
import { logout } from "../api/AuthAPI";
import { useEffect } from "react";

const Dialog = ({ chat }) => {

    const [messages, setMessages] = useRecoilState(chatMessages);
    const [isLogin, setIsLogin] = useRecoilState(isLoggedUser);

    useEffect(()=> {
        getAllMessages(getCurrentUserId(), chat.recipientId).then(response => {
            setMessages(response.data);
        }, error => {
            logout();
            setIsLogin(false);
        });
    }, [messages.length]);

    return (
        <div className="dialog-container">
            {messages.map(m=><MessageBox message={m}/>)}   
        </div>
    );
};

export default Dialog;