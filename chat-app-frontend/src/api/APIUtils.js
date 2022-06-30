import jwtDecode from "jwt-decode";
import { logout } from "./AuthAPI";

export const authHeader = () => {
    var accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return {Authorization: 'Bearer ' + accessToken};
    }
}

export const getCurrentUserId = () => {
    let tokenData = null;
    try {
        tokenData = jwtDecode(localStorage.getItem("accessToken"));
    } catch (error) {
        console.log(error);
        logout();
        return tokenData;
    }
    return tokenData.sub;
}

export const getCurrentUserName = () => {
    let tokenData = jwtDecode(localStorage.getItem("accessToken"));
    return tokenData.name;
}

export const handleError = (status) => {
    if (status === 401) {
        return 'Your session is expired! Please relogin';
    } else {
        return 'Server refused connection! Try to connect again later';
    }
}