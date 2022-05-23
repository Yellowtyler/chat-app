import axios from "axios";

const AUTH_SERVICE_URL = "http://localhost:8081/auth";

export const signupUser = (signUp) => {
    return axios.post(AUTH_SERVICE_URL + "/signup", signUp);
};

export const loginUser = (login) => {
    return axios.post(AUTH_SERVICE_URL + "/login", login)
    .then(response => localStorage.setItem("accessToken", response.data.token));
};

export const logout = () => {
    localStorage.removeItem("accessToken");
};
