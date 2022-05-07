
import ChatBox from './ChatBox';

const ChatList = ({chatList, setOpenedChat}) => {
    return (
    <ul className="chat-list-container">
        {
            chatList.map(chat => (<ChatBox chat={chat} setOpenedChat={setOpenedChat}/>))
        }
    </ul>
    );
};

export default ChatList;