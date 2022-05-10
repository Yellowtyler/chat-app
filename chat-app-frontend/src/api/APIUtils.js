import jwtDecode from "jwt-decode";

export const authHeader = () => {
    var accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return {Authorization: 'Bearer ' + accessToken};
    }
}

export const getCurrentUserId = () => {
    let tokenData = jwtDecode(localStorage.getItem("accessToken"));
    return tokenData.sub;
};