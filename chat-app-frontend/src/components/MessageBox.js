import { Card } from "react-bootstrap";

const MessageBox = ({ message }) => {

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title className="mb-2">{message.senderName}</Card.Title>
                    <Card.Text>{message.content}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
};

export default MessageBox;