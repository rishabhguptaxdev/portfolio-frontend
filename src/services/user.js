// src/services/auth.js
import api from "./api";

export const updateUserDetails = async (userData) => {
    try {
        const response = await api.patch("/api/v1/updateUserDetails", { userData });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const getUserDetails = async () => {
    try {
        const response = await api.get("/api/v1/getUserDetails");
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
