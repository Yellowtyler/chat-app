import MessageBox from "./MessageBox";

const Dialog = ({ messages }) => {
    return (
        <div className="dialog-container">
            {messages.map(m=><MessageBox message={m}/>)}   
        </div>
    );
};

export default Dialog;