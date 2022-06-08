import { useEffect, useState, useMemo } from "react";
import { searchForUsers } from "../api/SearchAPI";
import { getCurrentUserName } from "../api/APIUtils";
import FoundUser from "./FoundUser";

const SearchResult = ({ searchValue, isSearch }) => {

    const [foundUsers, setFoundUsers] = useState([]);
    const getUserName = useMemo(() => {
        return getCurrentUserName();
    }, [isSearch]);

    useEffect(()=>{
        searchForUsers(searchValue).then(response => {
            console.log(response.data);
            const foundUsers = response.data.filter(v => v.username !== getUserName);
            setFoundUsers(foundUsers);
        })
    }, [isSearch, searchValue]);

    return (
        <div className="search-result-container">
            <div className="found-users">
                <h5>Users:</h5>
                { foundUsers.map(u => <FoundUser foundUser={u}/>) }
            </div>
            <div className="found-messages">

            </div>
        </div>
    );
};

export default SearchResult;