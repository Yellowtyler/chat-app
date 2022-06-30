import axios from "axios";

const USER_API_URL = "http://localhost:8081/user/";

export const getUserStatus = (userId) => {
    return axios.get(USER_API_URL + 'status/' + userId);
};

export const updateUserStatus = (userId, status) => {
    return axios.post(USER_API_URL + 'status', { id: userId, status: status });
};