import { Card } from "react-bootstrap";
import { getCurrentUserId } from "../api/APIUtils";

const MessageBox = ({ message }) => {

    return (
        <div>
            <Card style={getCurrentUserId() === message.senderId ? { width: '15rem', backgroundColor: 'white', borderRadius: '8px', marginLeft: '15rem', transition: 0.5} : 
            { width: '15rem', backgroundColor: 'white', borderRadius: '8px', marginRight: '15rem', transition: 0.5}}>
                <Card.Body>
                    <Card.Title className="mb-2">{message.senderName}</Card.Title>
                    <Card.Text>{message.content}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MessageBox;