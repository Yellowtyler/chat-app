import { useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import { getCurrentUserName } from "../../api/APIUtils";
import { userId, chatMessages } from "../../recoil/example/atom";
import { calculateMessageDate } from "../../utils/DateUtils";
import { BiTrash , BiX} from "react-icons/bi";
import { deleteMessage } from "../../api/MessageAPI";

const MessageBox = ({ message, chat }) => {

    const [toDelete, setToDelete] = useState(false);
    const [messages, setMessages ] = useRecoilState(chatMessages);
    const [userID, ] = useRecoilState(userId);
    const calculateDate = useMemo(() => {
        return calculateMessageDate(message.creationDate);
    }, [messages.length]);

    const getUserName = useMemo(() => {
        return getCurrentUserName();
    }, [messages]);

    const handleClick = (e) => {
        setToDelete(!toDelete);
    };

    const deleteCurrentMessage = (e) => {
        deleteMessage(message.id).then(response => {
            setMessages(messages.filter(v => v.id !== message.id));
        });
    };

    return (
        <div onClick={handleClick}>
            <div className={userID === message.senderId ? 'message sent' : 'message recieved'}>
                <div>
                    <span className="message-sender-name">{userID === message.senderId ? getUserName : chat.recipientName}</span>
                </div>
                <div>
                    <span className="message-content">{message.content}</span>
                </div>
                <span className="message-date">{calculateDate}</span>
                <div>
                { toDelete && <BiTrash className="delete-message" size={20} onClick={deleteCurrentMessage}/> }
                { toDelete && <BiX className="cancel-action" size={20} onClick={handleClick}/> }
                </div>
            </div>
        </div>
    );
};

export default MessageBox;