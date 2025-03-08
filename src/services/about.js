// src/services/about.js
import api from "./api";

export const getAllAbouts = async (userId) => {
    try {
        const response = await api.get(`/api/v1/about`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addAbout = async (data, userId) => {
    try {
        const response = await api.post("/api/v1/about", { ...data, user: userId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateAbout = async (aboutId, data, userId) => {
    try {
        const response = await api.patch(`/api/v1/about/${aboutId}`, { ...data, user: userId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteAbout = async (aboutId, userId) => {
    try {
        const response = await api.delete(`/api/v1/about/${aboutId}`, { params: { userId } });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
