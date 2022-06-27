import axios from "axios";

const AUTH_SERVICE_URL = "http://localhost:8081/auth";
const RESET_PASSWORD_SERVICE_URL = "http://localhost:8081/resetPassword";


export const signupUser = (signUp) => {
    return axios.post(AUTH_SERVICE_URL + "/signup", signUp);
};

export const loginUser = (login) => {
    return axios.post(AUTH_SERVICE_URL + "/login", login)
    .then(response => localStorage.setItem("accessToken", response.data.token));
};

export const sendMailToChangePassword = (forgotPasswordRequest) => {
    return axios.post(RESET_PASSWORD_SERVICE_URL + '/sendMail', forgotPasswordRequest);
};

export const validateToken = (token) => {
    return axios.get(RESET_PASSWORD_SERVICE_URL + '/validateToken/' + token);
}

export const resetPassword = (resetPasswordRequest) => {
    return axios.post(RESET_PASSWORD_SERVICE_URL + '/reset', resetPasswordRequest);
}

export const logout = () => {
    localStorage.removeItem("accessToken");
};
