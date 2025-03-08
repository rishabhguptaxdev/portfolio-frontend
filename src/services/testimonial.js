// src/services/testimonial.js
import api from "./api";

export const getAllTestimonials = async (userId) => {
    try {
        const response = await api.get(`/api/v1/testimonial`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const addTestimonial = async (data, userId) => {
    try {
        const response = await api.post("/api/v1/testimonial", { ...data, user: userId });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const updateTestimonial = async (testimonialId, data, userId) => {
    try {
        const response = await api.patch(`/api/v1/testimonial/${testimonialId}`, {
            ...data,
            user: userId,
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const deleteTestimonial = async (testimonialId, userId) => {
    try {
        const response = await api.delete(`/api/v1/testimonial/${testimonialId}`, {
            params: { userId },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
