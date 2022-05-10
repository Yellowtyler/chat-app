
import ChatBox from './ChatBox';

const ChatList = ({chatList}) => {
    return (
    <ul className="chat-list-container">
        {
            chatList.map(chatBox => (<ChatBox chatBox={chatBox}/>))
        }
    </ul>
    );
};

export default ChatList;