import { useMemo } from "react";
import { useRecoilState } from "recoil";
import { getCurrentUserName } from "../api/APIUtils";
import { userId, chatMessages } from "../recoil/example/atom";
import { calculateMessageDate } from "../utils/DateUtils";

const MessageBox = ({ message, chat }) => {

    const [messages, ] = useRecoilState(chatMessages);
    const [userID, ] = useRecoilState(userId);
    const calculateDate = useMemo(() => {
        return calculateMessageDate(message.creationDate);
    }, [messages]);

    const getUserName = useMemo(() => {
        return getCurrentUserName();
    }, [messages]);

    return (
        <div>
            <div className={userID === message.senderId ? 'message sent' : 'message recieved'}>
                <div>
                    <span className="message-sender-name">{userID === message.senderId ? getUserName : chat.recipientName}</span>
                </div>
                <div>
                    <span className="message-content">{message.content}</span>
                </div>
                <span className="message-date">{calculateDate}</span>
            </div>
        </div>
    );
};

export default MessageBox;