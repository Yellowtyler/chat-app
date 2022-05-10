import axios from "axios";
import { authHeader } from "./APIUtils";

const MESSAGE_SERVICE_URL = 'http://localhost:8080';


export const getChats = (id) => {
    console.log(id);
    return axios.get(MESSAGE_SERVICE_URL + '/chats/' + id, {headers: authHeader()});
};

export const getAllMessages = (senderId, recipientId) => {
    return axios.get(MESSAGE_SERVICE_URL + '/messages/' + senderId + '/' + recipientId);
};