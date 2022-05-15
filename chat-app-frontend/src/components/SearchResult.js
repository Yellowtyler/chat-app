import { useEffect, useState } from "react";
import { searchForUsers } from "../api/SearchAPI";
import FoundUser from "./FoundUser";

const SearchResult = ({ searchValue, isSearch }) => {

    const [foundUsers, setFoundUsers] = useState([]);

    useEffect(()=>{
        searchForUsers(searchValue).then(response => {
            console.log(response.data);
            setFoundUsers(response.data);
        })
    }, [isSearch]);


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