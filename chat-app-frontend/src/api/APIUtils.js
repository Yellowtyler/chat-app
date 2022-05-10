import jwtDecode from "jwt-decode";

export const authHeader = () => {
    var accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    if (accessToken) {
        return {Authorization: 'Bearer ' + accessToken};
    }
}

export const getCurrentUserId = () => {
    let tokenData = jwtDecode(localStorage.getItem("accessToken"));
    console.log(tokenData);
    return tokenData.sub;
};

export const handleError = (status) => {
    if (status === 401) {
        return 'Your session is expired! Please relogin';
    } else {
        return 'Server refused connection! Try to connect again later';
    }
}