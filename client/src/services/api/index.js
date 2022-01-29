import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const registerAPI = (registerData) => {
    return axios.post(`${BASE_URL}/api/auth/register`, {
        ...registerData
    });
};

export const loginAPI = ({ email, password }) => {
    return axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password
    },
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
};

export const profileAPI = () => {
    return axios.get(`${BASE_URL}/api/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_access_token")}`
        }
    });
};

export const logoutAPI = () => {
    return axios.delete(`${BASE_URL}/api/logout`);
};

export const editProfileAPI = (newUserData) => {
    return axios.post(`${BASE_URL}/api/edit`, {
        ...newUserData
    },
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("jwt_access_token")}`
            },
        }
    );
};