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
    return tokenData.sub;
};