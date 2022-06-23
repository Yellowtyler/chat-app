import axios from "axios";
import { authHeader } from "./APIUtils";

const MESSAGE_SERVICE_URL = 'http://localhost:8080';


export const getChats = (id) => {
    return axios.get(MESSAGE_SERVICE_URL + '/chats/' + id, {headers: authHeader()});
};

export const getOrCreateChat = (getOrCreateChatRequest) => {
    return axios.post(MESSAGE_SERVICE_URL + '/chats', getOrCreateChatRequest, {headers: authHeader()});
};

export const getMessages = (senderId, recipientId, limit) => {
    return axios.get(MESSAGE_SERVICE_URL + '/messages/' + senderId + '/' + recipientId + '/' + limit, {headers: authHeader()});
};

export const countReceivedMessages = (senderId, recipientId) => {
    return axios.get(MESSAGE_SERVICE_URL+ '/messages/count/' + senderId + '/' + recipientId, {headers: authHeader()});
};

export const deleteMessage = (messageId) => {
    return axios.delete(MESSAGE_SERVICE_URL + '/messages/' + messageId, {headers: authHeader()});
};