import { Card } from "react-bootstrap";
import { getCurrentUserId } from "../api/AuthService";

const MessageBox = ({ message }) => {

    return (
        <div>
            <Card style={getCurrentUserId() === message.senderId ? { width: '15rem', backgroundColor: 'white', borderRadius: '8px', marginLeft: '15rem'} : 
            { width: '15rem', backgroundColor: 'white', borderRadius: '8px', marginRight: '15rem'}}>
                <Card.Body>
                    <Card.Title className="mb-2">{message.senderName}</Card.Title>
                    <Card.Text>{message.content}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MessageBox;