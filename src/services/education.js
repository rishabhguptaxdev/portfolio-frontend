// src/services/education.js
import api from "./api";

export const getAllEducations = async (userId) => {
    try {
        const response = await api.get(`/api/v1/education`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addEducation = async (data, userId) => {
    try {
        const response = await api.post("/api/v1/education", { ...data, user: userId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateEducation = async (educationId, data, userId) => {
    try {
        const response = await api.patch(`/api/v1/education/${educationId}`, {
            ...data,
            user: userId,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteEducation = async (educationId, userId) => {
    try {
        const response = await api.delete(`/api/v1/education/${educationId}`, {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
