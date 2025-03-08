// src/services/api.js
import axios from "axios";
import { getToken } from "../utils/helper.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL, // Use environment variable for base URL
});

// Request interceptor to add the JWT token to headers
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access (e.g., redirect to login)
            console.error("Unauthorized access. Please log in.");
        }
        return Promise.reject(error);
    }
);

export default api;
