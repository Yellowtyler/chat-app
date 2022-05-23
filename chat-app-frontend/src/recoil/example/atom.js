import { atom } from "recoil";
import { getCurrentUserId } from "../../api/APIUtils";

export const chatMessages = atom({
    key: "messages",
    default: []
});

export const chat = atom({
    key: "chat",
    default: {
        chatId: null,
        lastMessage: "hi",
        lastMessageDate: "2022-05-07T21:29:54.619371",
        lastMessageUser: null,
        recipientId: "1",
        recipientName: null
    }
});

export const isLoggedUser = atom({
    key: "isLoggedUser",
    default: localStorage.getItem("accessToken") ? true : false
});


export const popupMessage = atom({
    key: "popupMessage",
    default: ''
});

export const popupActive = atom({
    key: "popupActive",
    default: false
});

export const userId = atom({
    key: "userId",
    default: getCurrentUserId()
});