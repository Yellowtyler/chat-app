import { handleError } from '../api/APIUtils';
import { getChats } from '../api/MessageAPI';
import { useRecoilState } from 'recoil';
import ChatBox from './ChatBox';
import { useState, useEffect } from 'react';
import { chatMessages, popupActive, popupMessage } from "../recoil/example/atom";
import { userId } from '../recoil/example/atom';

const ChatBoxList = () => {
    const [userID, ] = useRecoilState(userId);
    const [chatList, setChatList] = useState([]);
    const [, setActivePopup] = useRecoilState(popupActive);
    const [, setPopupMessage] = useRecoilState(popupMessage);
    const [messages, ] = useRecoilState(chatMessages);

    useEffect(() => {
        getChats(userID).then(response=>{
            setChatList(response.data);
            console.log(response);
        }, error => {
            setActivePopup(true);
            setPopupMessage(handleError(error.response.status));
        });
    }, [messages]);

    return (<ul className="chat-list-container">
    { chatList.map(chatBox => (<ChatBox chatBox={chatBox}/>)) }
</ul>);
};

export default ChatBoxList;