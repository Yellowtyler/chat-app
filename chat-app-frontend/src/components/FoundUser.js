import { useRecoilState } from "recoil";
import { getCurrentUserName } from "../api/APIUtils";
import { getOrCreateChat } from "../api/MessageAPI";
import { chat, userId } from "../recoil/example/atom";
import { useState } from "react";

const FoundUser = ({ foundUser }) => {

    const [backgroundColor, setBackgroundColor] = useState('white')
    const [, setOpenedChat] = useRecoilState(chat);
    const [userID, ] = useRecoilState(userId);

    const handleClick = () => {
        console.log(foundUser);
        const getOrCreateChatRequest = {
            senderId: userID,
            senderName: getCurrentUserName(), 
            recipientId: foundUser.id, 
            recipientName: foundUser.username
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
            className='search-result' 
            onClick={handleClick} value={foundUser.id}
            style={{'backgroundColor': backgroundColor}} 
            onMouseOver={e=>setBackgroundColor('whitesmoke')} 
            onMouseOut={e=>setBackgroundColor('white')} 
            onMouseDown={e=>setBackgroundColor('grey')}
        >
            {foundUser.username}
        </div>
    );
};

export default FoundUser;