import { getCurrentUserId } from "../api/APIUtils";

const MessageBox = ({ message }) => {

    return (
        <div>
            <div className={getCurrentUserId() === message.senderId ? 'message sent' : 'message recieved'}>
                    <div>
                        <span className="message-sender-name">{message.senderName}</span>
                    </div>
                    <div>
                        <span className="message-content">{message.content}</span>
                    </div>
                    <span className="message-date">{new Date(message.creationDate).getHours() + ":" + new Date(message.creationDate).getMinutes()}</span>
            </div>
        </div>
    );
};

export default MessageBox;