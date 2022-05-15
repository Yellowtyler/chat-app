import { useRecoilState } from "recoil";
import { userId } from "../recoil/example/atom";
import { calculateMessageDate } from "../utils/DateUtils";

const MessageBox = ({ message }) => {

    const [userID, ] = useRecoilState(userId);

    return (
        <div>
            <div className={userID === message.senderId ? 'message sent' : 'message recieved'}>
                    <div>
                        <span className="message-sender-name">{message.senderName}</span>
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