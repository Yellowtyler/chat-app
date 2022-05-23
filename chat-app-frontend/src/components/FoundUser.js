import { useRecoilState } from "recoil";
import { getCurrentUserName } from "../api/APIUtils";
import { getOrCreateChat } from "../api/MessageAPI";
import { chat, userId } from "../recoil/example/atom";

const FoundUser = ({ foundUser }) => {

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
        <div onClick={handleClick} value={foundUser.id}>
            {foundUser.username}
        </div>
    );
};

export default FoundUser;