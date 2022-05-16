import { useRecoilState } from "recoil";
import { getCurrentUserName } from "../api/APIUtils";
import { userId } from "../recoil/example/atom";
import { calculateMessageDate } from "../utils/DateUtils";

const MessageBox = ({ message, chat }) => {

    const [userID, ] = useRecoilState(userId);

    return (
        <div>
            <div className={userID === message.senderId ? 'message sent' : 'message recieved'}>
                    <div>
                        <span className="message-sender-name">{userID === message.senderId ? getCurrentUserName() : chat.recipientName}</span>
                    </div>
                    <div>
                        <span className="message-content">{message.content}</span>
                    </div>
                    <span className="message-date">{calculateMessageDate(message.creationDate)}</span>
            </div>
        </div>
    );
};

export default MessageBox;