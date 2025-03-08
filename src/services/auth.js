// src/services/auth.js
import api from "./api";

export const login = async (email, password) => {
    try {
        const response = await api.post("/api/v1/login", { email, password });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const signup = async (userData) => {
    try {
        const response = await api.post("/api/v1/signup", userData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
