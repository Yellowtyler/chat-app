import axios from "axios";

const SERVICE_URL = "http://localhost:8081/search/";

export const searchForUsers = (username) => {
    return axios.get(SERVICE_URL + username);
};