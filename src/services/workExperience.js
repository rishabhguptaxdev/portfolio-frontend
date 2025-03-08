// src/services/workExperience.js
import api from "./api";

export const getAllWorkExperiences = async (userId) => {
    try {
        const response = await api.get(`/api/v1/work-experience`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addWorkExperience = async (data, userId) => {
    try {
        const response = await api.post("/api/v1/work-experience", { ...data, user: userId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateWorkExperience = async (workExperienceId, data, userId) => {
    try {
        const response = await api.patch(`/api/v1/work-experience/${workExperienceId}`, {
            ...data,
            user: userId,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteWorkExperience = async (workExperienceId, userId) => {
    try {
        const response = await api.delete(`/api/v1/work-experience/${workExperienceId}`, {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
