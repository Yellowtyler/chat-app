import { useRecoilState } from "recoil";
import { getCurrentUserName } from "../api/APIUtils";
import { getOrCreateChat } from "../api/MessageAPI";
import { chat, userId } from "../recoil/example/atom";
import { useState } from "react";

export const FoundMessage = ({ foundMessage }) => {
    const [backgroundColor, setBackgroundColor] = useState('white')
    const [, setOpenedChat] = useRecoilState(chat);
    const [userID, ] = useRecoilState(userId);

    const handleClick = () => {
        const getOrCreateChatRequest = {
            senderId: userID,
            senderName: getCurrentUserName(), 
            recipientId: foundMessage.recipientId, 
            recipientName: foundMessage.recipientName
        };
        getOrCreateChat(getOrCreateChatRequest).then(response => {
            console.log(response.data);
            setOpenedChat(response.data);
        }, error => {
            console.log(error);
        });
    };

    return (
        <div 
            className='found-user' 
            onClick={handleClick} value={foundMessage.id}
            style={{'backgroundColor': backgroundColor}} 
            onMouseOver={e=>setBackgroundColor('whitesmoke')} 
            onMouseOut={e=>setBackgroundColor('white')} 
            onMouseDown={e=>setBackgroundColor('grey')}
        >
            {foundMessage.content}
        </div>
    );
}
