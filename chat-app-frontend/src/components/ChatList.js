
import ChatBox from './ChatBox';

const ChatList = ({chatList}) => {
    return (
    <ul className="chat-list-container">
        {
            chatList.map(chat => (<ChatBox chat={chat}/>))
        }
    </ul>
    );
};

export default ChatList;