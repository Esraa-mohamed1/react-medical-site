import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000/api/users/";

export async function registerUser({ full_name, name, email, password, phone, address }) {
  const response = await fetch(BASE_URL + "register/user/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: name, full_name, phone, address, email, password }) // send username, not name
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || errorData.error || "Registration failed");
  }
  return response.json();
}

export async function loginUser({ name, password }) {
  const response = await fetch(BASE_URL + "login/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: name, password })
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || errorData.detail || "Login failed");
  }
  return response.json();
}

export async function registerDoctor(formData) {
  console.log(formData)
  const response = await fetch("http://127.0.0.1:8000/api/users/register/doctor/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || errorData.error || "Doctor registration failed");
  }
  return response.json();
}

export async function fetchDoctorById(doctorId) {
  const token = localStorage.getItem('access');
  const response = await fetch(`http://127.0.0.1:8000/api/users/doctors/${doctorId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {})
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || errorData.error || 'Failed to fetch doctor');
  }
  return response.json();
}

const GENERAL_BASE_URL = 'http://127.0.0.1:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: GENERAL_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('access'); // Or get from your auth state management
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
      localStorage.removeItem('access'); // Clear token
      localStorage.removeItem('loggedUser')
      window.location.href = '/login';
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
