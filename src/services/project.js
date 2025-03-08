// src/services/project.js
import api from "./api";

export const getAllProjects = async (userId) => {
    try {
        const response = await api.get(`/api/v1/project`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addProject = async (data, userId) => {
    try {
        const response = await api.post("/api/v1/project", { ...data, user: userId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateProject = async (projectId, data, userId) => {
    try {
        const response = await api.patch(`/api/v1/project/${projectId}`, { ...data, user: userId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteProject = async (projectId, userId) => {
    try {
        const response = await api.delete(`/api/v1/project/${projectId}`, { params: { userId } });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
