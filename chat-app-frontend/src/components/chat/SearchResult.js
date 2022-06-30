import { useEffect, useState, useMemo } from "react";
import { searchForMessages, searchForUsers } from "../../api/SearchAPI";
import { getCurrentUserName } from "../../api/APIUtils";
import FoundUser from "./FoundUser";
import { FoundMessage } from "./FoundMessage";

const SearchResult = ({ searchValue, isSearch }) => {

    const [foundUsers, setFoundUsers] = useState([]);
    const [foundMessages, setFoundMessage] = useState([]);

    const getUserName = useMemo(() => {
        return getCurrentUserName();
    }, [isSearch]);

    useEffect(() => {
        searchForUsers(searchValue).then(response => {
            const foundUsers = response.data.filter(v => v.username !== getUserName);
            setFoundUsers(foundUsers);
        });
        searchForMessages(searchValue).then(response => {
            setFoundMessage(response.data);
        });
    }, [isSearch, searchValue]);

    return (
        <div className="search-result-container">
            <div className="search-results">
                <h5>Users:</h5>
                { 
                    foundUsers.map(u => <FoundUser foundUser={u}/>)
                }
            </div>
            <div className="search-results">
                <h5>Messages:</h5>
                {
                    foundMessages.map(m => <FoundMessage foundMessage={m}/>)
                }
            </div>
        </div>
    );
};

export default SearchResult;