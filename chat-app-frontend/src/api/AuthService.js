import axios from "axios";
import jwtDecode from "jwt-decode";

const AUTH_SERVICE_URL = "http://localhost:8081/auth";

export const signupUser = (signUp) => {
    return axios.post(AUTH_SERVICE_URL + "/signup", signUp);
};

export const loginUser = (login) => {
    return axios.post(AUTH_SERVICE_URL + "/login", login)
    .then(response => localStorage.setItem("accessToken", response.data.token));
};

export const getCurrentUserId = () => {
    let tokenData = jwtDecode(localStorage.getItem("accessToken"));
    return tokenData.sub;
};

export const logout = () => {
    localStorage.removeItem("accessToken");
};

export const authHeader = () => {
    var accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
        return {Authorization: 'Bearer ' + accessToken};
    }
}