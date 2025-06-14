import axios from 'axios';
import { login } from './user-management/LoginService'


const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Create axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor
api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token'); // Or get from your auth state management
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token'); // Clear token
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

// GET request
export const getData = async (endpoint) => {
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// PUT request
export const updateData = async (endpoint, data) => {
    try {
        const response = await api.put(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
};

// PATCH request
export const patchData = async (endpoint, data) => {
    try {
        const response = await api.patch(endpoint, data);
        return response.data;
    } catch (error) {
        console.error('Error patching data:', error);
        throw error;
    }
};