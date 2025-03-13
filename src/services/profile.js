// src/services/project.js
import api from "./api";

export const getProfileByUsername = async (username) => {
    try {
        const response = await api.get(`/api/v1/profile?username=${username}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
