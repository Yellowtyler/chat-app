import { atom } from "recoil";

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
    default: 'saffsafaffasfsa'
});

export const popupActive = atom({
    key: "popupActive",
    default: true
});