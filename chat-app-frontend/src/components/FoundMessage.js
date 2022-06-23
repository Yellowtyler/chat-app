import { useRecoilState } from "recoil";
import { userId } from "../recoil/example/atom";
import { useState } from "react";

export const FoundMessage = ({ foundMessage }) => {
    const [backgroundColor, setBackgroundColor] = useState('white')
    const [userID, ] = useRecoilState(userId);

    return (
        <div 
            className='search-result' 
            value={foundMessage.id}
            style={{'backgroundColor': backgroundColor}} 
            onMouseOver={e=>setBackgroundColor('whitesmoke')} 
            onMouseOut={e=>setBackgroundColor('white')} 
            onMouseDown={e=>setBackgroundColor('grey')}
        >
            {foundMessage.senderId === userID && <span>You</span>}
            <span>{foundMessage.content}</span>
        </div>
    );
}
