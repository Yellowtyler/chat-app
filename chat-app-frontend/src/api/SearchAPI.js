import axios from "axios";
import { authHeader } from "./APIUtils";

const USER_SEARCH_SERVICE_URL = "http://localhost:8081/search/";
const MESSAGE_SEARCH_SERVICE_URL = "http://localhost:8080/search/";
export const searchForUsers = (username) => {
    return axios.get(USER_SEARCH_SERVICE_URL + username);
};

export const searchForMessages = (message) => {
    return axios.get(MESSAGE_SEARCH_SERVICE_URL + message, {headers: authHeader()});
};