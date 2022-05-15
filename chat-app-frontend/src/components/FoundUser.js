import { useRecoilState } from "recoil";
import { getChat } from "../api/MessageAPI";
import { chat, userId } from "../recoil/example/atom";

const FoundUser = ({ foundUser }) => {

    const [, setOpenedChat] = useRecoilState(chat);
    const [userID, ] = useRecoilState(userId);

    const handleClick = () => {
        console.log(foundUser);
        getChat(userID, foundUser.id).then(response => {
            setOpenedChat(response.data);
        }, error => {
            console.log(error);
        });
    };

    return (
        <div onClick={handleClick} value={foundUser.id}>
            {foundUser.username}
        </div>
    );
};

export default FoundUser;